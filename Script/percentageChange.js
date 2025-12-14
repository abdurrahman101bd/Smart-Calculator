function calculate() {
  const original = parseFloat(document.getElementById('originalValue').value) || 0;
  const newVal = parseFloat(document.getElementById('newValue').value) || 0;

  if (original === 0) {
    document.getElementById('percentageChange').textContent = 'Invalid';
    document.getElementById('percentageChange').className = 'result-display neutral';
    document.getElementById('changeType').textContent = 'N/A';
    document.getElementById('absoluteChange').textContent = 'N/A';
    document.getElementById('multiplier').textContent = 'N/A';
    return;
  }

  const change = newVal - original;
  const percentChange = (change / original) * 100;
  const multiplier = newVal / original;

  // Update percentage display
  const percentDisplay = document.getElementById('percentageChange');
  const sign = percentChange > 0 ? '+' : '';
  percentDisplay.textContent = sign + percentChange.toFixed(2) + '%';

  if (percentChange > 0) {
    percentDisplay.className = 'result-display increase';
  } else if (percentChange < 0) {
    percentDisplay.className = 'result-display decrease';
  } else {
    percentDisplay.className = 'result-display neutral';
  }

  // Update details
  document.getElementById('changeType').textContent =
    percentChange > 0 ? 'Increase' : percentChange < 0 ? 'Decrease' : 'No Change';
  document.getElementById('absoluteChange').textContent = Math.abs(change).toFixed(2);
  document.getElementById('multiplier').textContent = multiplier.toFixed(2) + 'x';
}

function clearAll() {
  document.getElementById('originalValue').value = '';
  document.getElementById('newValue').value = '';
  calculate();
}

function resetDefaults() {
  document.getElementById('originalValue').value = '100';
  document.getElementById('newValue').value = '150';
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();