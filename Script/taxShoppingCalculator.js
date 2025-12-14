let currentMode = 'income';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('incomeMode').style.display = 'none';
  document.getElementById('salesMode').style.display = 'none';
  document.getElementById('discountMode').style.display = 'none';
  if (mode === 'income') document.getElementById('incomeMode').style.display = 'block';
  else if (mode === 'sales') document.getElementById('salesMode').style.display = 'block';
  else if (mode === 'discount') document.getElementById('discountMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'income') {
    const income = parseFloat(document.getElementById('inc1').value) || 0;
    const taxRate = parseFloat(document.getElementById('inc2').value) || 0;
    const deductions = parseFloat(document.getElementById('inc3').value) || 0;
    const taxableIncome = income - deductions;
    const tax = (taxableIncome * taxRate) / 100;
    const netIncome = income - tax;
    document.getElementById('incResult').textContent = tax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('incTaxable').textContent = taxableIncome.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('incNet').textContent = netIncome.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  else if (currentMode === 'sales') {
    const price = parseFloat(document.getElementById('sale1').value) || 0;
    const taxRate = parseFloat(document.getElementById('sale2').value) || 0;
    const tax = (price * taxRate) / 100;
    const total = price + tax;
    document.getElementById('saleResult').textContent = total.toFixed(2);
    document.getElementById('saleTax').textContent = tax.toFixed(2);
    document.getElementById('saleBase').textContent = price.toFixed(2);
  }
  else if (currentMode === 'discount') {
    const original = parseFloat(document.getElementById('disc1').value) || 0;
    const discount = parseFloat(document.getElementById('disc2').value) || 0;
    const saved = (original * discount) / 100;
    const final = original - saved;
    document.getElementById('discResult').textContent = final.toFixed(2);
    document.getElementById('discSaved').textContent = saved.toFixed(2);
    document.getElementById('discPercent').textContent = discount.toFixed(0) + '%';
  }
}

function clearAll() {
  if (currentMode === 'income') {
    document.getElementById('inc1').value = '';
    document.getElementById('inc2').value = '';
    document.getElementById('inc3').value = '';
  } else if (currentMode === 'sales') {
    document.getElementById('sale1').value = '';
    document.getElementById('sale2').value = '';
  } else if (currentMode === 'discount') {
    document.getElementById('disc1').value = '';
    document.getElementById('disc2').value = '';
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === 'income') {
    document.getElementById('inc1').value = '75000';
    document.getElementById('inc2').value = '22';
    document.getElementById('inc3').value = '12000';
  } else if (currentMode === 'sales') {
    document.getElementById('sale1').value = '100';
    document.getElementById('sale2').value = '8.5';
  } else if (currentMode === 'discount') {
    document.getElementById('disc1').value = '200';
    document.getElementById('disc2').value = '25';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();