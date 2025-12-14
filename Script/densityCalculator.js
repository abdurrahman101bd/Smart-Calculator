let currentMode = 'density';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('densityMode').style.display = 'none';
  document.getElementById('massMode').style.display = 'none';
  document.getElementById('volumeMode').style.display = 'none';
  if (mode === 'density') document.getElementById('densityMode').style.display = 'block';
  else if (mode === 'mass') document.getElementById('massMode').style.display = 'block';
  else if (mode === 'volume') document.getElementById('volumeMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'density') {
    let mass = parseFloat(document.getElementById('dens1').value) || 0;
    let volume = parseFloat(document.getElementById('dens2').value) || 0;

    // Convert to g and cm³
    const massUnit = document.getElementById('densUnit1').value;
    const volUnit = document.getElementById('densUnit2').value;

    if (massUnit === 'kg') mass *= 1000;
    else if (massUnit === 'mg') mass /= 1000;
    else if (massUnit === 'lb') mass *= 453.592;

    if (volUnit === 'm3') volume *= 1000000;
    else if (volUnit === 'mm3') volume /= 1000;
    else if (volUnit === 'L') volume *= 1000;

    const density = mass / volume;
    document.getElementById('densResult').textContent = density.toFixed(2) + ' g/cm³';
  }
  else if (currentMode === 'mass') {
    let density = parseFloat(document.getElementById('mass1').value) || 0;
    let volume = parseFloat(document.getElementById('mass2').value) || 0;

    const densUnit = document.getElementById('massUnit1').value;
    const volUnit = document.getElementById('massUnit2').value;

    // Convert to g/cm³
    if (densUnit === 'kg/m3') density /= 1000;

    // Convert to cm³
    if (volUnit === 'm3') volume *= 1000000;
    else if (volUnit === 'L') volume *= 1000;

    const mass = density * volume;
    document.getElementById('massResult').textContent = mass.toFixed(2) + ' g';
  }
  else if (currentMode === 'volume') {
    let mass = parseFloat(document.getElementById('vol1').value) || 0;
    let density = parseFloat(document.getElementById('vol2').value) || 0;

    const massUnit = document.getElementById('volUnit1').value;
    const densUnit = document.getElementById('volUnit2').value;

    // Convert to g
    if (massUnit === 'kg') mass *= 1000;
    else if (massUnit === 'lb') mass *= 453.592;

    // Convert density to g/cm³
    if (densUnit === 'kg/m3') density /= 1000;

    const volume = mass / density;
    document.getElementById('volResult').textContent = volume.toFixed(2) + ' cm³';
  }
}

function clearAll() {
  if (currentMode === 'density') {
    document.getElementById('dens1').value = '';
    document.getElementById('dens2').value = '';
    document.getElementById('densResult').textContent = '0 g/cm³';
  } else if (currentMode === 'mass') {
    document.getElementById('mass1').value = '';
    document.getElementById('mass2').value = '';
    document.getElementById('massResult').textContent = '0 g';
  } else if (currentMode === 'volume') {
    document.getElementById('vol1').value = '';
    document.getElementById('vol2').value = '';
    document.getElementById('volResult').textContent = '0 cm³';
  }
}

function resetDefaults() {
  if (currentMode === 'density') {
    document.getElementById('dens1').value = '100';
    document.getElementById('dens2').value = '50';
  } else if (currentMode === 'mass') {
    document.getElementById('mass1').value = '2';
    document.getElementById('mass2').value = '50';
  } else if (currentMode === 'volume') {
    document.getElementById('vol1').value = '100';
    document.getElementById('vol2').value = '2';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) {
    calculate();
  }
});
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('unit-select')) {
    calculate();
  }
});

calculate();