let currentMode = 'dec';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('decMode').style.display = 'none';
  document.getElementById('convertMode').style.display = 'none';
  if (mode === 'dec') document.getElementById('decMode').style.display = 'block';
  else if (mode === 'convert') document.getElementById('convertMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'dec') {
    const decimal = parseInt(document.getElementById('decInput').value) || 0;

    if (decimal < 0) {
      document.getElementById('decBin').textContent = 'N/A';
      document.getElementById('decHex').textContent = 'N/A';
      document.getElementById('decOct').textContent = 'N/A';
      return;
    }
    document.getElementById('decBin').textContent = decimal.toString(2);
    document.getElementById('decHex').textContent = decimal.toString(16).toUpperCase();
    document.getElementById('decOct').textContent = decimal.toString(8);
  }
  else if (currentMode === 'convert') {
    // Binary to Decimal
    const binValue = document.getElementById('binInput').value.trim();
    if (binValue && /^[01]+$/.test(binValue)) {
      document.getElementById('binToDec').textContent = parseInt(binValue, 2);
    } else {
      document.getElementById('binToDec').textContent = binValue ? 'Invalid' : '0';
    }
    // Hex to Decimal
    const hexValue = document.getElementById('hexInput').value.trim();
    if (hexValue && /^[0-9A-Fa-f]+$/.test(hexValue)) {
      document.getElementById('hexToDec').textContent = parseInt(hexValue, 16);
    } else {
      document.getElementById('hexToDec').textContent = hexValue ? 'Invalid' : '0';
    }
    // Octal to Decimal
    const octValue = document.getElementById('octInput').value.trim();
    if (octValue && /^[0-7]+$/.test(octValue)) {
      document.getElementById('octToDec').textContent = parseInt(octValue, 8);
    } else {
      document.getElementById('octToDec').textContent = octValue ? 'Invalid' : '0';
    }
  }
}

function clearAll() {
  if (currentMode === 'dec') {
    document.getElementById('decInput').value = '';
  } else if (currentMode === 'convert') {
    document.getElementById('binInput').value = '';
    document.getElementById('hexInput').value = '';
    document.getElementById('octInput').value = '';
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === 'dec') {
    document.getElementById('decInput').value = '255';
  } else if (currentMode === 'convert') {
    document.getElementById('binInput').value = '11111111';
    document.getElementById('hexInput').value = 'FF';
    document.getElementById('octInput').value = '377';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();