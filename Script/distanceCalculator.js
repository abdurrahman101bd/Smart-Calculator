 let currentMode = '2d';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('mode2d').style.display = 'none';
  document.getElementById('mode3d').style.display = 'none';
  if (mode === '2d') document.getElementById('mode2d').style.display = 'block';
  else if (mode === '3d') document.getElementById('mode3d').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === '2d') {
    const x1 = parseFloat(document.getElementById('x1').value) || 0;
    const y1 = parseFloat(document.getElementById('y1').value) || 0;
    const x2 = parseFloat(document.getElementById('x2').value) || 0;
    const y2 = parseFloat(document.getElementById('y2').value) || 0;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const slope = dx !== 0 ? (dy / dx) : 'Undefined';
    document.getElementById('result2d').textContent = distance.toFixed(2);
    document.getElementById('dx').textContent = dx.toFixed(2);
    document.getElementById('dy').textContent = dy.toFixed(2);
    document.getElementById('slope').textContent = slope !== 'Undefined' ? slope.toFixed(2) : slope;
  }
  else if (currentMode === '3d') {
    const x1 = parseFloat(document.getElementById('x1_3d').value) || 0;
    const y1 = parseFloat(document.getElementById('y1_3d').value) || 0;
    const z1 = parseFloat(document.getElementById('z1_3d').value) || 0;
    const x2 = parseFloat(document.getElementById('x2_3d').value) || 0;
    const y2 = parseFloat(document.getElementById('y2_3d').value) || 0;
    const z2 = parseFloat(document.getElementById('z2_3d').value) || 0;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    document.getElementById('result3d').textContent = distance.toFixed(2);
    document.getElementById('dx3d').textContent = dx.toFixed(2);
    document.getElementById('dy3d').textContent = dy.toFixed(2);
    document.getElementById('dz3d').textContent = dz.toFixed(2);
  }
}

function clearAll() {
  if (currentMode === '2d') {
    document.getElementById('x1').value = '';
    document.getElementById('y1').value = '';
    document.getElementById('x2').value = '';
    document.getElementById('y2').value = '';
  } else if (currentMode === '3d') {
    document.getElementById('x1_3d').value = '';
    document.getElementById('y1_3d').value = '';
    document.getElementById('z1_3d').value = '';
    document.getElementById('x2_3d').value = '';
    document.getElementById('y2_3d').value = '';
    document.getElementById('z2_3d').value = '';
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === '2d') {
    document.getElementById('x1').value = '0';
    document.getElementById('y1').value = '0';
    document.getElementById('x2').value = '3';
    document.getElementById('y2').value = '4';
  } else if (currentMode === '3d') {
    document.getElementById('x1_3d').value = '0';
    document.getElementById('y1_3d').value = '0';
    document.getElementById('z1_3d').value = '0';
    document.getElementById('x2_3d').value = '3';
    document.getElementById('y2_3d').value = '4';
    document.getElementById('z2_3d').value = '5';
  }
  calculate();
}
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();