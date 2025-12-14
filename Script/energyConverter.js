function calculate() {
  const value = parseFloat(document.getElementById('inputValue').value) || 0;
  const unit = document.getElementById('inputUnit').value;

  let joule = 0;

  // Convert to Joule first
  switch(unit) {
    case 'joule':
      joule = value;
      break;
    case 'calorie':
      joule = value * 4.184;
      break;
    case 'kwh':
      joule = value * 3600000;
      break;
  }

  // Convert from Joule to all units
  document.getElementById('jouleResult').textContent = joule.toFixed(2);
  document.getElementById('calorieResult').textContent = (joule / 4.184).toFixed(2);
  document.getElementById('kcalResult').textContent = (joule / 4184).toFixed(3);
  document.getElementById('kwhResult').textContent = (joule / 3600000).toFixed(6);
}

function clearAll() {
  document.getElementById('inputValue').value = '';
  calculate();
}

function resetDefaults() {
  document.getElementById('inputValue').value = '1000';
  document.getElementById('inputUnit').value = 'joule';
  calculate();
}

document.getElementById('inputValue').addEventListener('input', calculate);
document.getElementById('inputUnit').addEventListener('change', calculate);

calculate();
