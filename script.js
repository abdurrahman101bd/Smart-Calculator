// DOM Elements
const display = document.getElementById('display');
const formula = document.getElementById('formula');
const keys = document.getElementById('keys');

// State
let current = '0';
let exp = '';
let lastOp = false;

// Update display
function update() {
    display.textContent = current;
    formula.textContent = exp;
    display.scrollLeft = display.scrollWidth; // scroll to right
}

// Clear everything
function clearAll() {
    current = '0';
    exp = '';
    lastOp = false;
    update();
}

// Delete last character
function del() {
    if (current.length > 1) current = current.slice(0, -1);
    else current = '0';
    update();
}

// Toggle negative
function neg() {
    if (current !== '0') current = current.startsWith('-') ? current.slice(1) : '-' + current;
    update();
}

// Percent
function percent() {
    current = String(parseFloat(current) / 100);
    update();
}

// Input digit or dot
function digit(d) {
    if (lastOp) {
        current = d === '.' ? '0.' : d;
        lastOp = false;
    } else {
        if (d === '.' && current.includes('.')) return;
        if (current === '0' && d !== '.') current = d;
        else current += d;
    }
    update();
}

// Operator
function op(o) {
    if (lastOp) exp = exp.slice(0, -1) + o;
    else exp += current + o;
    lastOp = true;
    current = '0';
    update();
}

// Evaluate expression
function equals() {
    try {
        let e = exp + current;
        if (!/^[0-9+\-*/.%\s()]+$/.test(e)) throw 'Err';
        e = e.replace(/%/g, '/100');
        const r = Function('"use strict";return(' + e + ')')();
        current = String(r);
        exp = '';
        lastOp = false;
        update();
    } catch {
        current = 'Error';
        exp = '';
        update();
        setTimeout(() => { current = '0'; update(); }, 1000);
    }
}

// Handle button clicks
keys.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;

    const val = b.dataset.value;
    const act = b.dataset.action;

    if (act === 'clear') return clearAll();
    if (act === 'del') return del();
    if (act === 'neg') return neg();
    if (act === 'equals') return equals();
    if (val) {
        if (/[0-9.]/.test(val)) digit(val);
        else if (/[%+\-*/]/.test(val)) {
            if (val === '%') percent();
            else op(val);
        }
    }
});

// Keyboard support with Shift operators
document.addEventListener('keydown', e => {
    const key = e.key;
    const shift = e.shiftKey;

    // Numbers
    if (/[0-9]/.test(key)) return digit(key);

    // Dot
    if (key === '.') return digit('.');

    // Operators
    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        if (key === '%') percent();
        else op(key);
        return;
    }

    // Shifted operators (optional)
    if (shift && key === '5') return op('%'); // Shift+5 = %
    if (shift && key === '=') return op('+'); // Shift+= = +

    // Enter / =
    if (key === 'Enter' || key === '=') return equals();

    // Backspace
    if (key === 'Backspace') return del();

    // Clear
    if (key === 'Escape' || key.toLowerCase() === 'c') return clearAll();

    // Negative toggle
    if (key.toLowerCase() === 'n') return neg();
});