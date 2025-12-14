const timeConversions = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2592000, // 30 days
  years: 31536000  // 365 days
};

function convert() {
  const fromValue = parseFloat(document.getElementById('fromValue').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;

  if (isNaN(fromValue)) {
    document.getElementById('result').textContent = 'Enter a valid number';
    return;
  }

  const valueInSeconds = fromValue * timeConversions[fromUnit];
  const result = valueInSeconds / timeConversions[toUnit];

  const formattedResult = result < 0.01
    ? result.toExponential(2)
    : result.toFixed(2);

  document.getElementById('result').textContent = `${formattedResult} ${toUnit}`;
}

function clearAll() {
  document.getElementById('fromValue').value = '';
  document.getElementById('result').textContent = '0';
}

function swapUnits() {
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;

  document.getElementById('fromUnit').value = toUnit;
  document.getElementById('toUnit').value = fromUnit;

  convert();
}

document.getElementById('fromValue').addEventListener('input', convert);
document.getElementById('fromUnit').addEventListener('change', convert);
document.getElementById('toUnit').addEventListener('change', convert);

convert();