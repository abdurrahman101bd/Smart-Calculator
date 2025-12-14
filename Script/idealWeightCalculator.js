let gender = 'male';

function setGender(g) {
  gender = g;
  document.querySelectorAll('.radio-group')[0].querySelectorAll('.radio-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  calculate();
}

function calculate() {
  const height = parseFloat(document.getElementById('height').value) || 0;
  const age = parseFloat(document.getElementById('age').value) || 0;

  if (height === 0) {
    document.getElementById('idealWeight').textContent = '0 kg';
    document.getElementById('minWeight').textContent = '0 kg';
    document.getElementById('maxWeight').textContent = '0 kg';
    document.getElementById('bmiRange').textContent = 'N/A';
    return;
  }
  // Robinson Formula (1983)
  let idealWeight = 0;
  const heightInInches = height / 2.54;

  if (gender === 'male') {
    idealWeight = 52 + (1.9 * (heightInInches - 60));
  } else {
    idealWeight = 49 + (1.7 * (heightInInches - 60));
  }
  // Adjust for age (slight adjustment)
  if (age > 50) {
    idealWeight *= 1.02;
  }
  // Calculate healthy BMI range (18.5 - 24.9)
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 24.9 * heightInMeters * heightInMeters;
  document.getElementById('idealWeight').textContent = idealWeight.toFixed(1) + ' kg';
  document.getElementById('minWeight').textContent = minWeight.toFixed(1) + ' kg';
  document.getElementById('maxWeight').textContent = maxWeight.toFixed(1) + ' kg';
  document.getElementById('bmiRange').textContent = '18.5 - 24.9';
}

function clearAll() {
  document.getElementById('height').value = '';
  document.getElementById('age').value = '';
  calculate();
}

function resetDefaults() {
  document.getElementById('height').value = '170';
  document.getElementById('age').value = '25';
  gender = 'male';

  document.querySelectorAll('.radio-group')[0].querySelectorAll('.radio-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === 0);
  });

  calculate();
}
document.getElementById('height').addEventListener('input', calculate);
document.getElementById('age').addEventListener('input', calculate);

calculate();