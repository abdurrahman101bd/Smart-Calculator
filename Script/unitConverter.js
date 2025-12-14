const unitData = {
  length: {
    units: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
    conversions: [1, 0.001, 100, 1000, 0.000621371, 1.09361, 3.28084, 39.3701]
  },
  weight: {
    units: ['Kilogram', 'Gram', 'Milligram', 'Ton', 'Pound', 'Ounce'],
    conversions: [1, 1000, 1000000, 0.001, 2.20462, 35.274]
  },
  volume: {
    units: ['Liter', 'Milliliter', 'Gallon (US)', 'Quart', 'Pint', 'Cup', 'Fluid Ounce'],
    conversions: [1, 1000, 0.264172, 1.05669, 2.11338, 4.22675, 33.814]
  },
  speed: {
    units: ['m/s', 'km/h', 'mph', 'knot', 'ft/s'],
    conversions: [1, 3.6, 2.23694, 1.94384, 3.28084]
  },
  data: {
    units: ['Byte', 'Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte'],
    conversions: [1, 0.001, 0.000001, 0.000000001, 0.000000000001]
  },
  energy: {
    units: ['Joule', 'Kilojoule', 'Calorie', 'Kilocalorie', 'Watt-hour'],
    conversions: [1, 0.001, 0.239006, 0.000239006, 0.000277778]
  }
};

let currentCategory = 'length';

function switchCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');

  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  unitData[category].units.forEach((unit, index) => {
    fromSelect.innerHTML += `<option value="${index}">${unit}</option>`;
    toSelect.innerHTML += `<option value="${index}">${unit}</option>`;
  });

  toSelect.selectedIndex = 1;
  convert();
}

function convert() {
  const value = parseFloat(document.getElementById('fromValue').value);
  const fromIndex = parseInt(document.getElementById('fromUnit').value);
  const toIndex = parseInt(document.getElementById('toUnit').value);

  if (isNaN(value)) {
    document.getElementById('result').textContent = '0';
    return;
  }

  const data = unitData[currentCategory];
  const fromConversion = data.conversions[fromIndex];
  const toConversion = data.conversions[toIndex];

  const baseValue = value / fromConversion;
  const result = baseValue * toConversion;

  const toUnit = data.units[toIndex];
  document.getElementById('result').textContent = `${result.toFixed(6)} ${toUnit}`;
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

switchCategory('length');