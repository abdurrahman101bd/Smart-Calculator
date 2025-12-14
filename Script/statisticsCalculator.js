let currentMode = 'meanmode';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  if (mode === 'probability') {
    document.getElementById('dataInput').style.display = 'none';
    document.getElementById('probInput').style.display = 'block';
  } else {
    document.getElementById('dataInput').style.display = 'block';
    document.getElementById('probInput').style.display = 'none';
  }
  calculate();
}

function parseData() {
  const input = document.getElementById('dataSet').value;
  return input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
}

function calculateMean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateMedian(arr) {
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}

function calculateMode(arr) {
  const freq = {};
  let maxFreq = 0;
  let modes = [];

  arr.forEach(n => {
    freq[n] = (freq[n] || 0) + 1;
    if (freq[n] > maxFreq) {
      maxFreq = freq[n];
      modes = [n];
    } else if (freq[n] === maxFreq && !modes.includes(n)) {
      modes.push(n);
    }
  });

  return maxFreq > 1 ? modes : [];
}

function calculateStdDev(arr) {
  const mean = calculateMean(arr);
  const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function calculate() {
  if (currentMode === 'meanmode') {
    const data = parseData();
    if (data.length === 0) return;
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);
    document.getElementById('resultLabel').textContent = 'Mean (Average)';
    document.getElementById('mainResult').textContent = mean.toFixed(2);
    document.getElementById('break1').textContent = median.toFixed(2);
    document.getElementById('label1').textContent = 'Median';
    document.getElementById('break2').textContent = mode.length > 0 ? mode.join(', ') : 'None';
    document.getElementById('label2').textContent = 'Mode';
  }
  else if (currentMode === 'stddev') {
    const data = parseData();
    if (data.length === 0) return;
    const stdDev = calculateStdDev(data);
    const mean = calculateMean(data);
    const variance = Math.pow(stdDev, 2);
    document.getElementById('resultLabel').textContent = 'Standard Deviation';
    document.getElementById('mainResult').textContent = stdDev.toFixed(2);
    document.getElementById('break1').textContent = variance.toFixed(2);
    document.getElementById('label1').textContent = 'Variance';
    document.getElementById('break2').textContent = mean.toFixed(2);
    document.getElementById('label2').textContent = 'Mean';
  }
  else if (currentMode === 'probability') {
    const favorable = parseFloat(document.getElementById('favorable').value) || 0;
    const total = parseFloat(document.getElementById('total').value) || 1;
    if (total === 0) return;
    const probability = (favorable / total);
    const percentage = probability * 100;
    const odds = favorable + ':' + (total - favorable);
    document.getElementById('resultLabel').textContent = 'Probability';
    document.getElementById('mainResult').textContent = probability.toFixed(4);
    document.getElementById('break1').textContent = percentage.toFixed(2) + '%';
    document.getElementById('label1').textContent = 'Percentage';
    document.getElementById('break2').textContent = odds;
    document.getElementById('label2').textContent = 'Odds';
  }
}

function clearAll() {
  if (currentMode === 'probability') {
    document.getElementById('favorable').value = '';
    document.getElementById('total').value = '';
  } else {
    document.getElementById('dataSet').value = '';
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === 'probability') {
    document.getElementById('favorable').value = '2';
    document.getElementById('total').value = '6';
  } else {
    document.getElementById('dataSet').value = '5, 10, 15, 20, 25, 30';
  }
  calculate();
}
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();