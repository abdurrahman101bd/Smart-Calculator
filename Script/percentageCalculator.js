let currentMode = 'basic';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');

  document.getElementById('basicMode').style.display = 'none';
  document.getElementById('increaseMode').style.display = 'none';
  document.getElementById('decreaseMode').style.display = 'none';
  document.getElementById('differenceMode').style.display = 'none';

  if (mode === 'basic') {
    document.getElementById('basicMode').style.display = 'block';
  } else if (mode === 'increase') {
    document.getElementById('increaseMode').style.display = 'block';
  } else if (mode === 'decrease') {
    document.getElementById('decreaseMode').style.display = 'block';
  } else if (mode === 'difference') {
    document.getElementById('differenceMode').style.display = 'block';
  }

  calculate();
}

function calculate() {
  if (currentMode === 'basic') {
    const percentage = parseFloat(document.getElementById('basic1').value) || 0;
    const value = parseFloat(document.getElementById('basic2').value) || 0;
    const result = (percentage / 100) * value;
    document.getElementById('basicResult').textContent = result.toFixed(2);
  } else if (currentMode === 'increase') {
    const value = parseFloat(document.getElementById('increase1').value) || 0;
    const percentage = parseFloat(document.getElementById('increase2').value) || 0;
    const result = value + (value * percentage / 100);
    document.getElementById('increaseResult').textContent = result.toFixed(2);
  } else if (currentMode === 'decrease') {
    const value = parseFloat(document.getElementById('decrease1').value) || 0;
    const percentage = parseFloat(document.getElementById('decrease2').value) || 0;
    const result = value - (value * percentage / 100);
    document.getElementById('decreaseResult').textContent = result.toFixed(2);
  } else if (currentMode === 'difference') {
    const val1 = parseFloat(document.getElementById('diff1').value) || 0;
    const val2 = parseFloat(document.getElementById('diff2').value) || 0;
    if (val1 === 0) {
      document.getElementById('diffResult').textContent = '0%';
      return;
    }
    const result = ((val2 - val1) / val1) * 100;
    document.getElementById('diffResult').textContent = result.toFixed(2) + '%';
  }
}

function clearAll() {
  if (currentMode === 'basic') {
    document.getElementById('basic1').value = '';
    document.getElementById('basic2').value = '';
    document.getElementById('basicResult').textContent = '0';
  } else if (currentMode === 'increase') {
    document.getElementById('increase1').value = '';
    document.getElementById('increase2').value = '';
    document.getElementById('increaseResult').textContent = '0';
  } else if (currentMode === 'decrease') {
    document.getElementById('decrease1').value = '';
    document.getElementById('decrease2').value = '';
    document.getElementById('decreaseResult').textContent = '0';
  } else if (currentMode === 'difference') {
    document.getElementById('diff1').value = '';
    document.getElementById('diff2').value = '';
    document.getElementById('diffResult').textContent = '0%';
  }
}

function resetDefaults() {
  if (currentMode === 'basic') {
    document.getElementById('basic1').value = '20';
    document.getElementById('basic2').value = '100';
  } else if (currentMode === 'increase') {
    document.getElementById('increase1').value = '100';
    document.getElementById('increase2').value = '20';
  } else if (currentMode === 'decrease') {
    document.getElementById('decrease1').value = '100';
    document.getElementById('decrease2').value = '20';
  } else if (currentMode === 'difference') {
    document.getElementById('diff1').value = '50';
    document.getElementById('diff2').value = '75';
  }
  calculate();
}

// Auto-calculate on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) {
    calculate();
  }
});

// Initial calculation
calculate();