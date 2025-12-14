let activity = 'sedentary';
    let climate = 'normal';

function setActivity(level) {
  activity = level;
  document.querySelectorAll('.radio-group')[0].querySelectorAll('.radio-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  calculate();
}

function setClimate(type) {
  climate = type;
  document.querySelectorAll('.radio-group')[1].querySelectorAll('.radio-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  calculate();
}

function calculate() {
  const weight = parseFloat(document.getElementById('weight').value) || 0;

  if (weight === 0) {
    document.getElementById('waterIntake').textContent = '0 L';
    document.getElementById('mlResult').textContent = '0 ml';
    document.getElementById('cupsResult').textContent = '0 cups';
    document.getElementById('glassesResult').textContent = '0 glasses';
    return;
  }
  // Base calculation: 30-35 ml per kg
  let waterIntake = weight * 33;
  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.3,
    intense: 1.5
  };
  waterIntake *= activityMultipliers[activity];
  // Climate adjustment
  if (climate === 'hot') {
    waterIntake *= 1.15;
  }
  // Convert to liters
  const liters = waterIntake / 1000;
  const cups = waterIntake / 237; // 1 cup = 237ml
  const glasses = waterIntake / 250; // 1 glass = 250ml
  document.getElementById('waterIntake').textContent = liters.toFixed(1) + ' L';
  document.getElementById('mlResult').textContent = Math.round(waterIntake) + ' ml';
  document.getElementById('cupsResult').textContent = cups.toFixed(1) + ' cups';
  document.getElementById('glassesResult').textContent = glasses.toFixed(1) + ' glasses';
}

function clearAll() {
  document.getElementById('weight').value = '';
  calculate();
}

function resetDefaults() {
  document.getElementById('weight').value = '70';
  activity = 'sedentary';
  climate = 'normal';

  document.querySelectorAll('.radio-group')[0].querySelectorAll('.radio-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === 0);
  });
  document.querySelectorAll('.radio-group')[1].querySelectorAll('.radio-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === 0);
  });

  calculate();
}

document.getElementById('weight').addEventListener('input', calculate);
calculate();