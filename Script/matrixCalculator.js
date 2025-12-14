let currentMode = 'add';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('addMode').style.display = 'none';
  document.getElementById('multiplyMode').style.display = 'none';
  document.getElementById('determinantMode').style.display = 'none';
  if (mode === 'add') document.getElementById('addMode').style.display = 'block';
  else if (mode === 'multiply') document.getElementById('multiplyMode').style.display = 'block';
  else if (mode === 'determinant') document.getElementById('determinantMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'add') {
    const a11 = parseFloat(document.getElementById('a11').value) || 0;
    const a12 = parseFloat(document.getElementById('a12').value) || 0;
    const a21 = parseFloat(document.getElementById('a21').value) || 0;
    const a22 = parseFloat(document.getElementById('a22').value) || 0;
    const b11 = parseFloat(document.getElementById('b11').value) || 0;
    const b12 = parseFloat(document.getElementById('b12').value) || 0;
    const b21 = parseFloat(document.getElementById('b21').value) || 0;
    const b22 = parseFloat(document.getElementById('b22').value) || 0;
    document.getElementById('r11').textContent = (a11 + b11).toFixed(1);
    document.getElementById('r12').textContent = (a12 + b12).toFixed(1);
    document.getElementById('r21').textContent = (a21 + b21).toFixed(1);
    document.getElementById('r22').textContent = (a22 + b22).toFixed(1);
  }
  else if (currentMode === 'multiply') {
    const a11 = parseFloat(document.getElementById('ma11').value) || 0;
    const a12 = parseFloat(document.getElementById('ma12').value) || 0;
    const a21 = parseFloat(document.getElementById('ma21').value) || 0;
    const a22 = parseFloat(document.getElementById('ma22').value) || 0;
    const b11 = parseFloat(document.getElementById('mb11').value) || 0;
    const b12 = parseFloat(document.getElementById('mb12').value) || 0;
    const b21 = parseFloat(document.getElementById('mb21').value) || 0;
    const b22 = parseFloat(document.getElementById('mb22').value) || 0;
    // Matrix multiplication
    const r11 = a11 * b11 + a12 * b21;
    const r12 = a11 * b12 + a12 * b22;
    const r21 = a21 * b11 + a22 * b21;
    const r22 = a21 * b12 + a22 * b22;
    document.getElementById('mr11').textContent = r11.toFixed(1);
    document.getElementById('mr12').textContent = r12.toFixed(1);
    document.getElementById('mr21').textContent = r21.toFixed(1);
    document.getElementById('mr22').textContent = r22.toFixed(1);
  }
  else if (currentMode === 'determinant') {
    const a = parseFloat(document.getElementById('d11').value) || 0;
    const b = parseFloat(document.getElementById('d12').value) || 0;
    const c = parseFloat(document.getElementById('d21').value) || 0;
    const d = parseFloat(document.getElementById('d22').value) || 0;
    // Determinant = ad - bc
    const det = (a * d) - (b * c);
    document.getElementById('detResult').textContent = det.toFixed(2);
  }
}

function clearAll() {
  if (currentMode === 'add') {
    ['a11', 'a12', 'a21', 'a22', 'b11', 'b12', 'b21', 'b22'].forEach(id => {
      document.getElementById(id).value = '';
    });
  } else if (currentMode === 'multiply') {
    ['ma11', 'ma12', 'ma21', 'ma22', 'mb11', 'mb12', 'mb21', 'mb22'].forEach(id => {
      document.getElementById(id).value = '';
    });
  } else if (currentMode === 'determinant') {
    ['d11', 'd12', 'd21', 'd22'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === 'add') {
    document.getElementById('a11').value = '1';
    document.getElementById('a12').value = '2';
    document.getElementById('a21').value = '3';
    document.getElementById('a22').value = '4';
    document.getElementById('b11').value = '5';
    document.getElementById('b12').value = '6';
    document.getElementById('b21').value = '7';
    document.getElementById('b22').value = '8';
  } else if (currentMode === 'multiply') {
    document.getElementById('ma11').value = '1';
    document.getElementById('ma12').value = '2';
    document.getElementById('ma21').value = '3';
    document.getElementById('ma22').value = '4';
    document.getElementById('mb11').value = '2';
    document.getElementById('mb12').value = '0';
    document.getElementById('mb21').value = '1';
    document.getElementById('mb22').value = '3';
  } else if (currentMode === 'determinant') {
    document.getElementById('d11').value = '4';
    document.getElementById('d12').value = '3';
    document.getElementById('d21').value = '2';
    document.getElementById('d22').value = '1';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('matrix-input')) calculate();
});

calculate();