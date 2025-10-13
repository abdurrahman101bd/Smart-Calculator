// DOM Elements
const display = document.getElementById('display');
const formula = document.getElementById('formula');
const keys = document.getElementById('keys');
const memoryIndicator = document.getElementById('memoryIndicator');
const themeToggle = document.getElementById('themeToggle');

// State
let current = '0';
let exp = '';
let lastOp = false;
let memory = 0;

// Detect system theme preference
function detectSystemTheme() {
    // Check if user has saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = lightModeIcon;
        } else {
            themeToggle.innerHTML = darkModeIcon;
        }
    } else {
        // Detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = lightModeIcon;
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = darkModeIcon;
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Theme Toggle
const darkModeIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';

const lightModeIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f39c12"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Change icon
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = lightModeIcon;
    } else {
        themeToggle.innerHTML = darkModeIcon;
    }
    
    // Save preference
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        // Only auto-update if user hasn't manually set a preference recently
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            if (e.matches) {
                document.body.classList.add('light-mode');
                themeToggle.innerHTML = lightModeIcon;
            } else {
                document.body.classList.remove('light-mode');
                themeToggle.innerHTML = darkModeIcon;
            }
        }
    });
}

// Initialize theme on load
detectSystemTheme();

// Update display
function update() {
    display.textContent = current;
    formula.textContent = exp;
    display.scrollLeft = display.scrollWidth; // scroll to right
}

// Update Memory Indicator
function updateMemoryIndicator() {
    if (memory !== 0) {
        memoryIndicator.classList.add('active');
    } else {
        memoryIndicator.classList.remove('active');
    }
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

// Square Root
function sqrt() {
    try {
        const num = parseFloat(current);
        if (num < 0) {
            current = 'Error';
            update();
            setTimeout(() => { current = '0'; update(); }, 1000);
        } else {
            current = String(Math.sqrt(num));
            update();
        }
    } catch {
        current = 'Error';
        update();
        setTimeout(() => { current = '0'; update(); }, 1000);
    }
}

// Memory Functions
function memoryAdd() {
    memory += parseFloat(current) || 0;
    updateMemoryIndicator();
}

function memorySubtract() {
    memory -= parseFloat(current) || 0;
    updateMemoryIndicator();
}

function memoryRecall() {
    current = String(memory);
    update();
}

function memoryClear() {
    memory = 0;
    updateMemoryIndicator();
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
    if (act === 'sqrt') return sqrt();
    
    // Memory actions
    if (act === 'mc') return memoryClear();
    if (act === 'mr') return memoryRecall();
    if (act === 'm+') return memoryAdd();
    if (act === 'm-') return memorySubtract();
    
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
    
    // Square root
    if (key.toLowerCase() === 's' || key.toLowerCase() === 'r') return sqrt();
});

// Initialize
update();
updateMemoryIndicator();