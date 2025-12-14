function calculate() {
  const value = parseFloat(document.getElementById('inputValue').value) || 0;
  const unit = document.getElementById('inputUnit').value;

  let pascal = 0;

  // Convert to Pascal first
  switch(unit) {
    case 'pascal':
      pascal = value;
      break;
    case 'bar':
      pascal = value * 100000;
      break;
    case 'atm':
      pascal = value * 101325;
      break;
    case 'psi':
      pascal = value * 6894.76;
      break;
  }

  // Convert from Pascal to all units
  document.getElementById('pascalResult').textContent = pascal.toFixed(2);
  document.getElementById('barResult').textContent = (pascal / 100000).toFixed(6);
  document.getElementById('atmResult').textContent = (pascal / 101325).toFixed(6);
  document.getElementById('psiResult').textContent = (pascal / 6894.76).toFixed(4);
}

function clearAll() {
  document.getElementById('inputValue').value = '';
  calculate();
}

function resetDefaults() {
  document.getElementById('inputValue').value = '100';
  document.getElementById('inputUnit').value = 'pascal';
  calculate();
}

document.getElementById('inputValue').addEventListener('input', calculate);
document.getElementById('inputUnit').addEventListener('change', calculate);

calculate();