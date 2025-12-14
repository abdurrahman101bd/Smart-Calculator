let currentMode = 'mortgage';

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('mortgageMode').style.display = 'none';
  document.getElementById('compoundMode').style.display = 'none';
  document.getElementById('emiMode').style.display = 'none';
  document.getElementById('savingsMode').style.display = 'none';
  if (mode === 'mortgage') document.getElementById('mortgageMode').style.display = 'block';
  else if (mode === 'compound') document.getElementById('compoundMode').style.display = 'block';
  else if (mode === 'emi') document.getElementById('emiMode').style.display = 'block';
  else if (mode === 'savings') document.getElementById('savingsMode').style.display = 'block';
  calculate();
}

function calculate() {
  if (currentMode === 'mortgage') {
    const homePrice = parseFloat(document.getElementById('mort1').value) || 0;
    const downPayment = parseFloat(document.getElementById('mort2').value) || 0;
    const rate = parseFloat(document.getElementById('mort3').value) || 0;
    const years = parseFloat(document.getElementById('mort4').value) || 0;
    const principal = homePrice - downPayment;
    const monthlyRate = (rate / 100) / 12;
    const numPayments = years * 12;
    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    const total = monthly * numPayments;
    const interest = total - principal;
    document.getElementById('mortResult').textContent = monthly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('mortTotal').textContent = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('mortInterest').textContent = interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  else if (currentMode === 'compound') {
    const principal = parseFloat(document.getElementById('comp1').value) || 0;
    const rate = parseFloat(document.getElementById('comp2').value) || 0;
    const time = parseFloat(document.getElementById('comp3').value) || 0;
    const n = parseFloat(document.getElementById('comp4').value) || 1;
    const amount = principal * Math.pow(1 + (rate/100)/n, n * time);
    const interest = amount - principal;
    const growth = ((amount - principal) / principal) * 100;
    document.getElementById('compResult').textContent = amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('compInterest').textContent = interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('compGrowth').textContent = growth.toFixed(0) + '%';
  }
  else if (currentMode === 'emi') {
    const principal = parseFloat(document.getElementById('emi1').value) || 0;
    const rate = parseFloat(document.getElementById('emi2').value) || 0;
    const months = parseFloat(document.getElementById('emi3').value) || 0;
    const monthlyRate = (rate / 100) / 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
                (Math.pow(1 + monthlyRate, months) - 1);
    const total = emi * months;
    const interest = total - principal;
    document.getElementById('emiResult').textContent = emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('emiTotal').textContent = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('emiInterest').textContent = interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  else if (currentMode === 'savings') {
    const initial = parseFloat(document.getElementById('sav1').value) || 0;
    const monthly = parseFloat(document.getElementById('sav2').value) || 0;
    const rate = parseFloat(document.getElementById('sav3').value) || 0;
    const years = parseFloat(document.getElementById('sav4').value) || 0;
    const monthlyRate = (rate / 100) / 12;
    const months = years * 12;
    const futureInitial = initial * Math.pow(1 + monthlyRate, months);
    const futureMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const total = futureInitial + futureMonthly;
    const totalDeposits = initial + (monthly * months);
    const interest = total - totalDeposits;
    document.getElementById('savResult').textContent = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('savDeposits').textContent = totalDeposits.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('savInterest').textContent = interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

function clearAll() {
  if (currentMode === 'mortgage') {
    document.getElementById('mort1').value = '';
    document.getElementById('mort2').value = '';
    document.getElementById('mort3').value = '';
    document.getElementById('mort4').value = '';
  } else if (currentMode === 'compound') {
    document.getElementById('comp1').value = '';
    document.getElementById('comp2').value = '';
    document.getElementById('comp3').value = '';
    document.getElementById('comp4').value = '';
  } else if (currentMode === 'emi') {
    document.getElementById('emi1').value = '';
    document.getElementById('emi2').value = '';
    document.getElementById('emi3').value = '';
  } else if (currentMode === 'savings') {
    document.getElementById('sav1').value = '';
    document.getElementById('sav2').value = '';
    document.getElementById('sav3').value = '';
    document.getElementById('sav4').value = '';
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === 'mortgage') {
    document.getElementById('mort1').value = '300000';
    document.getElementById('mort2').value = '60000';
    document.getElementById('mort3').value = '6.5';
    document.getElementById('mort4').value = '30';
  } else if (currentMode === 'compound') {
    document.getElementById('comp1').value = '10000';
    document.getElementById('comp2').value = '8';
    document.getElementById('comp3').value = '10';
    document.getElementById('comp4').value = '12';
  } else if (currentMode === 'emi') {
    document.getElementById('emi1').value = '50000';
    document.getElementById('emi2').value = '10';
    document.getElementById('emi3').value = '36';
  } else if (currentMode === 'savings') {
    document.getElementById('sav1').value = '5000';
    document.getElementById('sav2').value = '200';
    document.getElementById('sav3').value = '5';
    document.getElementById('sav4').value = '10';
  }
  calculate();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('input-field')) calculate();
});

calculate();