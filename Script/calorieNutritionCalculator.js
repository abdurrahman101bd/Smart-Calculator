let currentMode = 'calorie';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  const activity = document.getElementById('activity');
  const goal = document.getElementById('goal');
  const exercise = document.getElementById('exerciseInput');
  activity.style.display = 'none';
  goal.style.display = 'none';
  exercise.style.display = 'none';
  if (mode === 'tdee' || mode === 'calorie' || mode === 'macro') {
    activity.style.display = 'block';
  }
  if (mode === 'calorie' || mode === 'macro') {
    goal.style.display = 'block';
  }
  if (mode === 'burned') {
    exercise.style.display = 'block';
  }
  calculate();
}

function calculateBMR(gender, age, weight, height) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculate() {
  const gender = document.getElementById('gender').value;
  const age = parseFloat(document.getElementById('age').value) || 0;
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  const height = parseFloat(document.getElementById('height').value) || 0;
  const activityLevel = parseFloat(document.getElementById('activity').value) || 1.55;
  const goalCal = parseFloat(document.getElementById('goal').value) || 0;
  const bmr = calculateBMR(gender, age, weight, height);
  if (currentMode === 'bmr') {
    document.getElementById('resultLabel').textContent = 'Basal Metabolic Rate';
    document.getElementById('mainResult').textContent = Math.round(bmr) + ' cal/day';
    document.getElementById('break1').textContent = Math.round(bmr * 0.7);
    document.getElementById('label1').textContent = 'At Rest (70%)';
    document.getElementById('break2').textContent = Math.round(bmr * 0.3);
    document.getElementById('label2').textContent = 'Digestion (30%)';
  }
  else if (currentMode === 'tdee') {
    const tdee = bmr * activityLevel;
    document.getElementById('resultLabel').textContent = 'Total Daily Energy';
    document.getElementById('mainResult').textContent = Math.round(tdee).toLocaleString() + ' cal';
    document.getElementById('break1').textContent = Math.round(bmr);
    document.getElementById('label1').textContent = 'BMR';
    document.getElementById('break2').textContent = Math.round(tdee - bmr);
    document.getElementById('label2').textContent = 'Activity Burn';
  }
  else if (currentMode === 'calorie') {
    const tdee = bmr * activityLevel;
    const target = tdee + goalCal;
    document.getElementById('resultLabel').textContent = 'Target Daily Calories';
    document.getElementById('mainResult').textContent = Math.round(target).toLocaleString() + ' cal';
    document.getElementById('break1').textContent = Math.round(tdee);
    document.getElementById('label1').textContent = 'Maintenance';
    document.getElementById('break2').textContent = goalCal > 0 ? '+' + goalCal : goalCal;
    document.getElementById('label2').textContent = 'Goal Adjustment';
  }
  else if (currentMode === 'protein') {
    const protein = weight * 2.2; // 2.2g per kg for active individuals
    const calories = protein * 4;
    document.getElementById('resultLabel').textContent = 'Daily Protein';
    document.getElementById('mainResult').textContent = Math.round(protein) + ' g';
    document.getElementById('break1').textContent = Math.round(calories);
    document.getElementById('label1').textContent = 'Calories from Protein';
    document.getElementById('break2').textContent = Math.round(weight * 1.6) + 'g';
    document.getElementById('label2').textContent = 'Minimum (1.6g/kg)';
  }
  else if (currentMode === 'macro') {
    const tdee = bmr * activityLevel + goalCal;
    const protein = weight * 2;
    const proteinCal = protein * 4;
    const fat = (tdee * 0.25) / 9;
    const carbs = (tdee - proteinCal - (fat * 9)) / 4;

    document.getElementById('resultLabel').textContent = 'Macro Breakdown';
    document.getElementById('mainResult').textContent = Math.round(tdee).toLocaleString() + ' cal';
    document.getElementById('breakdown').innerHTML = `
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(protein)}g</span><span class="breakdown-label">Protein (${Math.round((proteinCal/tdee)*100)}%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(carbs)}g</span><span class="breakdown-label">Carbs (${Math.round(((carbs*4)/tdee)*100)}%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(fat)}g</span><span class="breakdown-label">Fat (25%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(tdee)}</span><span class="breakdown-label">Total Calories</span></div>
    `;
    return;
  }
  else if (currentMode === 'burned') {
    const met = parseFloat(document.getElementById('exercise').value) || 7;
    const duration = parseFloat(document.getElementById('duration').value) || 30;
    const burned = (met * weight * duration) / 60;

    document.getElementById('resultLabel').textContent = 'Calories Burned';
    document.getElementById('mainResult').textContent = Math.round(burned) + ' cal';
    document.getElementById('break1').textContent = Math.round(duration);
    document.getElementById('label1').textContent = 'Minutes';
    document.getElementById('break2').textContent = Math.round(burned / duration);
    document.getElementById('label2').textContent = 'Cal/Min';
  }
}

function clearAll() {
  document.getElementById('age').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('height').value = '';
  if (currentMode === 'burned') {
    document.getElementById('duration').value = '';
  }
  calculate();
}

function resetDefaults() {
  document.getElementById('age').value = '30';
  document.getElementById('weight').value = '70';
  document.getElementById('height').value = '175';
  document.getElementById('gender').value = 'male';
  document.getElementById('activity').value = '1.55';
  document.getElementById('goal').value = '0';
  if (currentMode === 'burned') {
    document.getElementById('duration').value = '30';
    document.getElementById('exercise').value = '7';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field') || e.target.classList.contains('select-field')) {
    calculate();
  }
});

calculate();