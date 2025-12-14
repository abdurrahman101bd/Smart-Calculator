let currentMode = 'ohm';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('ohmMode').style.display = 'none';
  document.getElementById('voltageMode').style.display = 'none';
  document.getElementById('powerMode').style.display = 'none';
  document.getElementById('btuMode').style.display = 'none';
  if (mode === 'ohm') document.getElementById('ohmMode').style.display = 'block';
  else if (mode === 'voltage') document.getElementById('voltageMode').style.display = 'block';
  else if (mode === 'power') document.getElementById('powerMode').style.display = 'block';
  else if (mode === 'btu') document.getElementById('btuMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'ohm') {
    const current = parseFloat(document.getElementById('ohm1').value) || 0;
    const resistance = parseFloat(document.getElementById('ohm2').value) || 0;
    const voltage = current * resistance;
    document.getElementById('ohmResult').textContent = voltage.toFixed(2) + ' V';
  }
  else if (currentMode === 'voltage') {
    const current = parseFloat(document.getElementById('volt1').value) || 0;
    const length = parseFloat(document.getElementById('volt2').value) || 0;
    const resistance = parseFloat(document.getElementById('volt3').value) || 0;
    const voltageDrop = (2 * length * resistance * current) / 1000;
    document.getElementById('voltResult').textContent = voltageDrop.toFixed(2) + ' V';
  }
  else if (currentMode === 'power') {
    const voltage = parseFloat(document.getElementById('power1').value) || 0;
    const current = parseFloat(document.getElementById('power2').value) || 0;
    const watts = voltage * current;
    const horsepower = watts / 746;
    document.getElementById('powerResult').textContent =
      watts.toFixed(0) + ' W / ' + horsepower.toFixed(2) + ' HP';
  }
  else if (currentMode === 'btu') {
    const watts = parseFloat(document.getElementById('btu1').value) || 0;
    const btu = watts * 3.412;
    document.getElementById('btuResult').textContent =
      btu.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' BTU/hr';
  }
}

function clearAll() {
  if (currentMode === 'ohm') {
    document.getElementById('ohm1').value = '';
    document.getElementById('ohm2').value = '';
    document.getElementById('ohmResult').textContent = '0 V';
  } else if (currentMode === 'voltage') {
    document.getElementById('volt1').value = '';
    document.getElementById('volt2').value = '';
    document.getElementById('volt3').value = '';
    document.getElementById('voltResult').textContent = '0 V';
  } else if (currentMode === 'power') {
    document.getElementById('power1').value = '';
    document.getElementById('power2').value = '';
    document.getElementById('powerResult').textContent = '0 W / 0 HP';
  } else if (currentMode === 'btu') {
    document.getElementById('btu1').value = '';
    document.getElementById('btuResult').textContent = '0 BTU/hr';
  }
}

function resetDefaults() {
  if (currentMode === 'ohm') {
    document.getElementById('ohm1').value = '10';
    document.getElementById('ohm2').value = '12';
  } else if (currentMode === 'voltage') {
    document.getElementById('volt1').value = '20';
    document.getElementById('volt2').value = '100';
    document.getElementById('volt3').value = '1.588';
  } else if (currentMode === 'power') {
    document.getElementById('power1').value = '120';
    document.getElementById('power2').value = '10';
  } else if (currentMode === 'btu') {
    document.getElementById('btu1').value = '1000';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) {
    calculate();
  }
});

calculate();