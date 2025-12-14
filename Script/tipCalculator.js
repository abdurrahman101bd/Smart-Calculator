function selectTip(percent) {
  document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tipPercent').value = percent;
  calculateTip();
}

function calculateTip() {
  const billAmount = parseFloat(document.getElementById('billAmount').value) || 0;
  const tipPercent = parseFloat(document.getElementById('tipPercent').value) || 0;
  const splitCount = parseInt(document.getElementById('splitCount').value) || 1;

  if (billAmount <= 0 || splitCount < 1) {
    document.getElementById('totalAmount').textContent = '0.00';
    document.getElementById('tipAmount').textContent = '0.00';
    document.getElementById('perPerson').textContent = '0.00';
    document.getElementById('billPerPerson').textContent = '0.00';
    document.getElementById('tipPerPerson').textContent = '0.00';
    return;
  }

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / splitCount;
  const billPerPerson = billAmount / splitCount;
  const tipPerPerson = tipAmount / splitCount;

  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
  document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
  document.getElementById('perPerson').textContent = perPerson.toFixed(2);
  document.getElementById('billPerPerson').textContent = billPerPerson.toFixed(2);
  document.getElementById('tipPerPerson').textContent = tipPerPerson.toFixed(2);
}

function clearAll() {
  document.getElementById('billAmount').value = '';
  document.getElementById('tipPercent').value = '';
  document.getElementById('splitCount').value = '1';
  document.getElementById('totalAmount').textContent = '0.00';
  document.getElementById('tipAmount').textContent = '0.00';
  document.getElementById('perPerson').textContent = '0.00';
  document.getElementById('billPerPerson').textContent = '0.00';
  document.getElementById('tipPerPerson').textContent = '0.00';
  document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
}

function resetDefaults() {
  document.getElementById('billAmount').value = '100';
  document.getElementById('tipPercent').value = '15';
  document.getElementById('splitCount').value = '1';
  document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tip-btn')[1].classList.add('active');
  calculateTip();
}

document.getElementById('billAmount').addEventListener('input', calculateTip);
document.getElementById('tipPercent').addEventListener('input', calculateTip);
document.getElementById('splitCount').addEventListener('input', calculateTip);

calculateTip();