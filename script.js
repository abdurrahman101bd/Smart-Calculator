// Calculator State
let currentValue = '0';
let previousValue = '';
let operation = null;
let memory = 0;
let lastAnswer = 0;
let history = [];
let lastResult = null;
let lastOperation = null;
let isError = false;

// DOM Elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const memoryIndicator = document.getElementById('memoryIndicator');
const themeToggle = document.getElementById('themeToggle');
const historyToggle = document.getElementById('historyToggle');
const shortcutsToggle = document.getElementById('shortcutsToggle');
const historyPanel = document.getElementById('historyPanel');
const shortcutsPanel = document.getElementById('shortcutsPanel');
const historyList = document.getElementById('historyList');
const closeHistory = document.getElementById('closeHistory');
const closeShortcuts = document.getElementById('closeShortcuts');
const clearHistoryBtn = document.getElementById('clearHistory');
const displaySection = document.getElementById('displaySection');

// Load saved data on startup
function loadSavedData() {
  // Load theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.remove('light-mode');
  }
  
  // Load memory
  const savedMemory = localStorage.getItem('calcMemory');
  if (savedMemory) {
    memory = parseFloat(savedMemory) || 0;
  }
  
  // Load last answer
  const savedAns = localStorage.getItem('calcAns');
  if (savedAns) {
    lastAnswer = parseFloat(savedAns) || 0;
  }
  
  // Load history
  try {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.error('Failed to load history:', e);
  }
}

// Save data to localStorage
function saveHistory() {
  try {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

// Theme Toggle with localStorage
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  themeToggle.innerHTML = isLight
    ? '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';
});

// Panel Toggles
historyToggle.addEventListener('click', () => {
  historyPanel.classList.toggle('active');
  shortcutsPanel.classList.remove('active');
});

shortcutsToggle.addEventListener('click', () => {
  shortcutsPanel.classList.toggle('active');
  historyPanel.classList.remove('active');
});

closeHistory.addEventListener('click', () => {
  historyPanel.classList.remove('active');
});

closeShortcuts.addEventListener('click', () => {
  shortcutsPanel.classList.remove('active');
});

// Update Display with scroll
function updateDisplay(value = currentValue) {
  display.textContent = value;
  display.scrollLeft = display.scrollWidth;
}

// Calculator Functions
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function safeEval(expr) {
  expr = expr.replace(/π/g, Math.PI.toString())
             .replace(/e(?![0-9])/g, Math.E.toString())
             .replace(/\^/g, '**')
             .replace(/sqrt\(/g, 'Math.sqrt(')
             .replace(/sin\(/g, 'Math.sin(')
             .replace(/cos\(/g, 'Math.cos(')
             .replace(/tan\(/g, 'Math.tan(')
             .replace(/log\(/g, 'Math.log10(')
             .replace(/ln\(/g, 'Math.log(');
  
  // Handle factorial
  expr = expr.replace(/(\d+(\.\d+)?)\!/g, (match, num) => {
    return factorial(parseFloat(num));
  });
  
  try {
    const result = new Function('return ' + expr)();
    if (!isFinite(result)) throw new Error('Invalid result');
    return result;
  } catch {
    return 'Error';
  }
}

// Add to History with timestamp
function addToHistory(expression, result) {
  if (result === 'Error') return;
  
  const historyItem = {
    expression: expression,
    result: result,
    timestamp: Date.now()
  };
  
  history.unshift(historyItem);
  if (history.length > 50) history.pop();
  
  saveHistory();
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  if (history.length === 0) {
    historyList.innerHTML = '<div class="empty-state">No calculations yet</div>';
  } else {
    historyList.innerHTML = history.map((item, index) => `
      <div class="history-item" data-index="${index}">
        <div class="history-expr">${item.expression}</div>
        <div class="history-result">= ${item.result}</div>
      </div>
    `).join('');
  }
}

// History item click handler
historyList.addEventListener('click', (e) => {
  const item = e.target.closest('.history-item');
  if (!item) return;
  
  const index = parseInt(item.dataset.index);
  const historyItem = history[index];
  
  if (historyItem) {
    currentValue = historyItem.result.toString();
    isError = false;
    updateDisplay();
  }
});

// Clear history with confirmation
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Clear all history?')) {
    history = [];
    saveHistory();
    updateHistoryDisplay();
  }
});

// Memory Functions with localStorage
function updateMemoryIndicator() {
  memoryIndicator.classList.toggle('active', memory !== 0);
}

function getCurrentValue() {
  if (currentValue === "" || isError) return 0;
  const result = safeEval(currentValue);
  return result === 'Error' ? 0 : result;
}

function handleMemory(action) {
  if (action === 'ans') {
    if (!isError) {
      if (currentValue === '0') {
        currentValue = lastAnswer.toString(); // Replace 0 with lastAnswer
      } else {
        currentValue += lastAnswer.toString(); // Append normally
      }
      updateDisplay();
    }
    return;
  }

  const currentVal = getCurrentValue();
  
  switch(action) {
    case 'mc':
      memory = 0;
      break;
    case 'mr':
      if (!isError) {
        currentValue += memory.toString();
        updateDisplay();
      }
      break;
    case 'm+':
      memory += currentVal;
      break;
    case 'm-':
      memory -= currentVal;
      break;
    case 'ms':
      memory = currentVal;
      break;
  }
  
  localStorage.setItem('calcMemory', memory.toString());
  updateMemoryIndicator();
}

// Clear All function
function clearAll() {
  currentValue = "0";
  lastResult = null;
  lastOperation = null;
  isError = false;
  historyDisplay.textContent = "\u00A0";
  updateDisplay();
}

// Delete Last function
function deleteLast() {
  if (isError) {
    clearAll();
    return;
  }
  currentValue = currentValue.slice(0, -1) || "0";
  updateDisplay();
}

// Calculate function with repeat operation
function calculate() {
  if (isError) {
    clearAll();
    return;
  }

  historyDisplay.textContent = currentValue;
  const result = safeEval(currentValue);
  
  if (result === 'Error') {
    currentValue = 'Error';
    isError = true;
  } else {
    addToHistory(currentValue, result);
    
    const match = currentValue.match(/([+\-*/^].+)$/);
    lastOperation = match ? match[1] : null;
    lastResult = result;
    lastAnswer = result;
    currentValue = String(Math.round(result * 1000000000) / 1000000000);
    localStorage.setItem('calcAns', lastAnswer.toString());
  }
  
  updateDisplay();
}

// Button Click Handler
document.getElementById('keys').addEventListener('click', (e) => {
  const btn = e.target.closest('.key');
  if (!btn) return;
  
  // Button press animation
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = '', 100);
  
  const action = btn.dataset.action;
  const value = btn.dataset.value;
  const closeBracket = btn.dataset.closeBracket === 'true';
  
  if (action && (action.startsWith('m') || action === 'ans')) {
    handleMemory(action);
    return;
  }
  
  if (action) {
    switch(action) {
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
      case 'equals':
        if (isError) {
          clearAll();
          return;
        }

        const lastResultStr = lastResult !== null ? String(lastResult) : null;

        if (lastResultStr !== null && currentValue === lastResultStr && lastOperation) {
          historyDisplay.textContent = currentValue + lastOperation;
          currentValue = String(safeEval(lastResult + lastOperation));
          lastResult = safeEval(currentValue);
          lastAnswer = lastResult;
          localStorage.setItem('calcAns', lastAnswer.toString());
          updateDisplay();
          return;
        }

        if (currentValue === "" && lastResult !== null && lastOperation) {
          historyDisplay.textContent = lastResult + lastOperation;
          currentValue = String(safeEval(lastResult + lastOperation));
          lastResult = safeEval(currentValue);
          lastAnswer = lastResult;
          localStorage.setItem('calcAns', lastAnswer.toString());
          updateDisplay();
          return;
        }

        calculate();
        break;
    }
  } else if (value) {
    if (isError) {
      clearAll();
    }
    
    if (currentValue === '0' && value !== '.') {
      currentValue = value;
    } else {
      currentValue += value;
    }
    
    if (closeBracket) {
      currentValue += ")";
    }
    
    updateDisplay();
  }
});

// Keyboard Support & Shortcuts
document.addEventListener('keydown', (e) => {
  // Don't interfere if user is typing in display
  if (document.activeElement === display) return;

  // Numbers & Operators
  if (/^[0-9+\-*/%^().]$/.test(e.key)) {
    if (isError) clearAll();
    if (currentValue === '0' && e.key !== '.') currentValue = e.key;
    else currentValue += e.key;
    updateDisplay();
  }
  // Enter = Calculate
  else if (e.key === 'Enter') {
    document.querySelector('[data-action="equals"]').click();
  }
  // Escape = Clear All
  else if (e.key === 'Escape') {
    clearAll();
  }
  // Backspace = Delete Last
  else if (e.key === 'Backspace') {
    e.preventDefault();
    deleteLast();
  }
  // ANS
  else if (e.key.toLowerCase() === 'a') handleMemory('ans');

  // Additional shortcuts
  else if (e.key.toLowerCase() === 's') appendValue('sin(');
  else if (e.key.toLowerCase() === 'c') appendValue('cos(');
  else if (e.key.toLowerCase() === 't') appendValue('tan(');
  else if (e.key.toLowerCase() === 'l') appendValue('log(');
  else if (e.key.toLowerCase() === 'n') appendValue('ln(');
  else if (e.key.toLowerCase() === 'r') appendValue('sqrt(');
  else if (e.key.toLowerCase() === 'p') appendValue('π');
  else if (e.key.toLowerCase() === 'f') appendValue('!');

  // Memory shortcuts
  else if (e.shiftKey && e.key.toLowerCase() === 's') handleMemory('ms');
  else if (e.shiftKey && e.key.toLowerCase() === 'r') handleMemory('mr');
  else if (e.shiftKey && e.key.toLowerCase() === 'c') handleMemory('mc');

  // Copy to clipboard
  else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    navigator.clipboard.writeText(currentValue).then(() => {
      console.log('Copied to clipboard!');
    });
  }
});

// Function to append value
function appendValue(val) {
  if (isError) clearAll();
  currentValue += val;
  updateDisplay();
}

// Display contenteditable handling
display.addEventListener('input', (e) => {
  currentValue = display.textContent;
  if (currentValue === '0' && display.textContent.length > 1) {
    currentValue = display.textContent.replace(/^0+/, '');
    display.textContent = currentValue;
  }
  display.scrollLeft = display.scrollWidth;
});

// Display keydown handler (prevent unwanted keys)
display.addEventListener('keydown', (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
  const isNumber = /^[0-9]$/.test(e.key);
  const isOperator = /^[+\-*/%^().]$/.test(e.key);

  if (e.key === 'Enter') {
    e.preventDefault();
    document.querySelector('[data-action="equals"]').click();
    display.blur();
    return;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    clearAll();
    display.blur();
    return;
  }
  if (!isNumber && !isOperator && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
  }
});

// Focus on display when clicking display section
displaySection.addEventListener('click', (e) => {
  if (e.target === displaySection || e.target === historyDisplay) {
    display.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    if (display.childNodes.length > 0) {
      range.setStart(display.childNodes[0], display.textContent.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});

// Initialize calculator
loadSavedData();
updateDisplay();
updateMemoryIndicator();
updateHistoryDisplay();