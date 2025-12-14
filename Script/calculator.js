const display = document.getElementById("display");
const history = document.getElementById("history");
const memoryIndicator = document.getElementById("memoryIndicator");
const keys = document.getElementById("keys");

let memory = 0;
let lastAnswer = 0;
let lastOperator = "";
let lastOperand = "";
let lastResult = 0;
let mode = "deg"; // deg or rad

function updateDisplay(val) {
  display.textContent = val;
  display.scrollLeft = display.scrollWidth;
}

function updateHistory(val) {
  history.textContent = val || "\u00A0";
}

function getCursorPosition() {
  const sel = window.getSelection();
  if (!sel.rangeCount) return display.textContent.length;
  const range = sel.getRangeAt(0);
  const textNode = display.firstChild;
  if (!textNode) return 0;
  return range.startOffset;
}

function setCursorPosition(pos) {
  setTimeout(() => {
    const range = document.createRange();
    const sel = window.getSelection();
    const textNode = display.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const safePos = Math.min(pos, textNode.length);
      range.setStart(textNode, safePos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, 0);
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n !== Math.floor(n)) return NaN; // Only integers
  if (n > 170) return Infinity; // Prevent overflow
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function toRadians(x) {
  return mode === "deg" ? (x * Math.PI) / 180 : x;
}

function evaluateExpression(expr) {
  try {
    // Check for empty brackets
    if (/\(\s*\)/.test(expr)) {
      return "Error";
    }

    // Handle percentage - convert to decimal
    expr = expr.replace(/(\d+(?:\.\d+)?)%/g, (match, num) => {
      return parseFloat(num) / 100;
    });

    // Replace operators
    expr = expr
      .split('÷').join('/')
      .split('×').join('*')
      .split('−').join('-')
      .split('π').join(Math.PI)
      .split('e').join(Math.E)
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**");

    // Handle factorial
    expr = expr.replace(/(\d+(?:\.\d+)?)!/g, (match, n) => {
      const num = parseFloat(n);
      const result = factorial(num);
      return isNaN(result) ? "Error" : result;
    });

    // Handle trigonometric functions with mode conversion
    expr = expr.replace(/sin\(/g, (match) => {
      return mode === "deg" ? "Math.sin((Math.PI/180)*(" : "Math.sin(";
    });
    
    expr = expr.replace(/cos\(/g, (match) => {
      return mode === "deg" ? "Math.cos((Math.PI/180)*(" : "Math.cos(";
    });
    
    expr = expr.replace(/tan\(/g, (match) => {
      return mode === "deg" ? "Math.tan((Math.PI/180)*(" : "Math.tan(";
    });

    // Add extra closing brackets for trig functions in deg mode
    if (mode === "deg") {
      const sinCount = (expr.match(/Math\.sin\(/g) || []).length;
      const cosCount = (expr.match(/Math\.cos\(/g) || []).length;
      const tanCount = (expr.match(/Math\.tan\(/g) || []).length;
      const extraBrackets = sinCount + cosCount + tanCount;
      expr += ')'.repeat(extraBrackets);
    }

    // Check for consecutive operators
    if (/[\+\-\*\/]{2,}/.test(expr.replace(/\*\*/g, ''))) {
      return "Error";
    }

    const result = eval(expr);
    
    // Check for invalid results
    if (!isFinite(result)) {
      return "Error";
    }
    
    return result;
  } catch (e) {
   // console.error("Evaluation error:", e);
    return "Error";
  }
}

function sanitizeInput(text) {
  // Allow only valid calculator characters
  const validChars = /[0-9+\-×÷*/%^()√πe.!\s]/g;
  const matches = text.match(validChars);
  return matches ? matches.join('') : '';
}

function canInsertDecimal(text, pos) {
  // Check if we can insert a decimal point at current position
  // Find the current number being typed
  let start = pos - 1;
  while (start >= 0 && /[0-9.]/.test(text[start])) {
    if (text[start] === '.') return false; // Already has decimal
    start--;
  }
  return true;
}

function insert(v, close) {
  const t = display.textContent;
  const pos = getCursorPosition();

  // Special handling for decimal point
  if (v === '.') {
    if (!canInsertDecimal(t, pos)) {
      return; // Don't insert if already has decimal
    }
  }

  // Handle consecutive operators - replace last operator
  if (/[+\-×÷*/%^]$/.test(t.slice(0, pos)) && /[+\-×÷*/%^]/.test(v)) {
    const before = t.slice(0, pos - 1);
    const after = t.slice(pos);
    const newText = before + v + after;
    updateDisplay(newText);
    setCursorPosition(before.length + v.length);
    return;
  }

  if (t === "0" || t === "Error") {
    // Don't start with operators
    if (/[+×÷*/%^]/.test(v)) return;
    
    if (close) {
      updateDisplay(v + ")");
      setCursorPosition(v.length);
    } else {
      updateDisplay(v);
      setCursorPosition(v.length);
    }
    return;
  }

  const before = t.slice(0, pos);
  const after = t.slice(pos);

  if (close) {
    const newText = before + v + ")" + after;
    updateDisplay(newText);
    setCursorPosition(before.length + v.length);
  } else {
    const newText = before + v + after;
    updateDisplay(newText);
    setCursorPosition(before.length + v.length);
  }
}

keys.addEventListener("click", e => {
  const btn = e.target.closest(".key");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;
  const closeBracket = btn.dataset.closeBracket;

  // Clear
  if (action === "clear") {
    updateDisplay("0");
    updateHistory("");
    lastOperator = "";
    lastOperand = "";
    lastResult = 0;
    return;
  }

  // Delete
  if (action === "delete") {
    const t = display.textContent;
    const pos = getCursorPosition();
    if (pos > 0) {
      const n = t.slice(0, pos - 1) + t.slice(pos);
      updateDisplay(n || "0");
      setCursorPosition(pos - 1);
    }
    return;
  }

  // Equals
  if (action === "equals") {
    let expr = display.textContent;
    
    // Repeated equals logic
    if (lastOperator && lastOperand && /^-?[0-9.]+$/.test(display.textContent)) {
      expr = display.textContent + lastOperator + lastOperand;
    } else {
      // Save last operator and operand
      const match = display.textContent.match(/([+\-*×÷/%^])([^+\-*×÷/%^]+)$/);
      if (match) {
        lastOperator = match[1];
        lastOperand = match[2];
      } else {
        lastOperator = "";
        lastOperand = "";
      }
    }

    const result = evaluateExpression(expr);

    if (result === "Error" || isNaN(result)) {
      updateDisplay("Error");
      updateHistory(expr);
    } else {
      // Format result for display
      let formattedResult;
      if (Number.isInteger(result)) {
        formattedResult = result;
      } else {
        // Remove trailing zeros
        formattedResult = parseFloat(result.toFixed(10));
      }
      updateDisplay(String(formattedResult));
      lastAnswer = formattedResult;
      lastResult = formattedResult;
      updateHistory(expr);
    }
    
    return;
  }

  // Memory Clear
  if (action === "mc") { 
    memory = 0; 
    memoryIndicator.classList.remove("active"); 
    return; 
  }

  // Memory Recall
  if (action === "mr") {
    if (memory === 0) return; // Don't insert 0 from empty memory
    
    const memVal = String(memory);
    const t = display.textContent;
    const pos = getCursorPosition();

    if (t === "0" || t === "Error") {
      updateDisplay(memVal);
      setCursorPosition(memVal.length);
    } else {
      const before = t.slice(0, pos);
      const after = t.slice(pos);
      const newText = before + memVal + after;
      updateDisplay(newText);
      setCursorPosition(before.length + memVal.length);
    }
    return;
  }

  // Memory Add
  if (action === "m+") {
    const currentVal = parseFloat(display.textContent);
    const val = isNaN(currentVal) ? lastAnswer : currentVal;
    if (isNaN(val)) return;
    memory += val;
    if (memory !== 0) {
      memoryIndicator.classList.add("active");
    }
    return;
  }

  // Memory Subtract
  if (action === "m-") {
    const currentVal = parseFloat(display.textContent);
    const val = isNaN(currentVal) ? lastAnswer : currentVal;
    if (isNaN(val)) return;
    memory -= val;
    if (memory !== 0) {
      memoryIndicator.classList.add("active");
    } else {
      memoryIndicator.classList.remove("active");
    }
    return;
  }

  // Memory Store
  if (action === "ms") {
    const currentVal = parseFloat(display.textContent);
    const val = isNaN(currentVal) ? lastAnswer : currentVal;
    if (isNaN(val)) return;
    memory = val;
    if (memory !== 0) {
      memoryIndicator.classList.add("active");
    }
    return;
  }

  // Answer (Last Result)
  if (action === "ans") {
    if (lastAnswer === 0) return; // Don't insert if no previous answer
    
    const t = display.textContent;
    const pos = getCursorPosition();
    const ansStr = String(lastAnswer);

    if (t === "0" || t === "Error") {
      updateDisplay(ansStr);
      setCursorPosition(ansStr.length);
    } else {
      const before = t.slice(0, pos);
      const after = t.slice(pos);
      const newText = before + ansStr + after;
      updateDisplay(newText);
      setCursorPosition(before.length + ansStr.length);
    }
    return;
  }

  // Mode switching
  if (action === "deg") {
    mode = "deg";
    document.querySelectorAll(".mode").forEach(m => m.classList.remove("active"));
    btn.classList.add("active");
    return;
  }
  
  if (action === "rad") {
    mode = "rad";
    document.querySelectorAll(".mode").forEach(m => m.classList.remove("active"));
    btn.classList.add("active");
    return;
  }

  // Toggle Sign
  if (action === "toggleSign") {
    const t = display.textContent;
    if (t === "0" || t === "Error") return;
    
    const pos = getCursorPosition();
    
    // Find the number at cursor position
    let start = pos - 1;
    let end = pos;
    
    // Find start of number
    while (start >= 0 && /[0-9.]/.test(t[start])) {
      start--;
    }
    start++;
    
    // Find end of number
    while (end < t.length && /[0-9.]/.test(t[end])) {
      end++;
    }
    
    // If we found a number
    if (start < end) {
      const before = t.slice(0, start);
      const number = t.slice(start, end);
      const after = t.slice(end);
      
      // Check if already has minus sign before
      if (start > 0 && t[start - 1] === '-') {
        // Remove minus
        updateDisplay(t.slice(0, start - 1) + number + after);
        setCursorPosition(pos - 1);
      } else {
        // Add minus
        updateDisplay(before + '-' + number + after);
        setCursorPosition(pos + 1);
      }
    } else {
      // No number found, toggle entire display
      if (t.startsWith("-")) {
        updateDisplay(t.slice(1));
      } else {
        updateDisplay("-" + t);
      }
    }
    return;
  }

  // Power
  if (action === "power") {
    insert("^");
    return;
  }

  // Exponential notation
  if (action === "exp") {
    const t = display.textContent;
    // Only add if current display is a valid number
    if (/^-?\d+(\.\d+)?$/.test(t) && !t.includes('e')) {
      updateDisplay(t+ "e+");
      setCursorPosition(display.textContent.length);
    }
    return;
  }

  // Regular value insertion
  if (value) {
    insert(value, closeBracket);
  }
});

// Sanitize and prevent invalid input
display.addEventListener("input", (e) => {
  const originalText = display.textContent;
  const sanitized = sanitizeInput(originalText);
  
  if (sanitized !== originalText) {
    const pos = getCursorPosition();
    updateDisplay(sanitized || "0");
    setCursorPosition(Math.min(pos, sanitized.length));
  } else if (sanitized === "") {
    updateDisplay("0");
  }
});

// Prevent paste of invalid content
display.addEventListener("paste", (e) => {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text');
  const sanitized = sanitizeInput(text);
  
  if (sanitized) {
    const pos = getCursorPosition();
    const current = display.textContent;
    const before = current.slice(0, pos);
    const after = current.slice(pos);
    
    if (current === "0" || current === "Error") {
      updateDisplay(sanitized);
      setCursorPosition(sanitized.length);
    } else {
      const newText = before + sanitized + after;
      updateDisplay(newText);
      setCursorPosition(before.length + sanitized.length);
    }
  }
});

// Enter key support
display.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const expr = display.textContent;
    const result = evaluateExpression(expr);
    
    if (result === "Error" || isNaN(result)) {
      updateDisplay("Error");
    } else {
      let formattedResult;
      if (Number.isInteger(result)) {
        formattedResult = result;
      } else {
        formattedResult = parseFloat(result.toFixed(10));
      }
      updateDisplay(String(formattedResult));
      lastAnswer = formattedResult;
    }
    
    updateHistory(expr);
  }
  
  // Prevent default for some keys
  if (e.key === "=" || e.key === "Escape") {
    e.preventDefault();
    if (e.key === "Escape") {
      updateDisplay("0");
      updateHistory("");
    }
  }
});