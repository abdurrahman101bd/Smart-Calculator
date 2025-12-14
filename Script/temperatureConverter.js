function convert() {
  const value = parseFloat(document.getElementById('tempValue').value);
  const fromUnit = document.getElementById('fromUnit').value;

  if (isNaN(value)) {
    document.getElementById('celsiusValue').textContent = '0.0°C';
    document.getElementById('fahrenheitValue').textContent = '0.0°F';
    document.getElementById('kelvinValue').textContent = '0.0K';
    return;
  }

  let celsius, fahrenheit, kelvin;

  if (fromUnit === 'celsius') {
    celsius = value;
  } else if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * 5/9;
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  }

  fahrenheit = (celsius * 9/5) + 32;
  kelvin = celsius + 273.15;

  document.getElementById('celsiusValue').textContent = celsius.toFixed(1) + '°C';
  document.getElementById('fahrenheitValue').textContent = fahrenheit.toFixed(1) + '°F';
  document.getElementById('kelvinValue').textContent = kelvin.toFixed(1) + 'K';
}

function clearAll() {
  document.getElementById('tempValue').value = '';
  document.getElementById('celsiusValue').textContent = '0.0°C';
  document.getElementById('fahrenheitValue').textContent = '0.0°F';
  document.getElementById('kelvinValue').textContent = '0.0K';
}

function swapUnit() {
  const select = document.getElementById('fromUnit');
  const currentIndex = select.selectedIndex;
  select.selectedIndex = (currentIndex + 1) % 3;
  convert();
}

document.getElementById('tempValue').addEventListener('input', convert);
document.getElementById('fromUnit').addEventListener('change', convert);

convert();