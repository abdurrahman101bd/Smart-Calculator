function calculateLoan() {
  const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
  const annualRate = parseFloat(document.getElementById('interestRate').value) || 0;
  const loanYears = parseFloat(document.getElementById('loanTerm').value) || 0;

  if (loanAmount <= 0 || annualRate <= 0 || loanYears <= 0) {
    document.getElementById('monthlyPayment').textContent = '0';
    document.getElementById('totalPayment').textContent = '0';
    document.getElementById('totalInterest').textContent = '0';
    document.getElementById('paymentCount').textContent = '0';
    document.getElementById('principalAmount').textContent = '0';
    return;
  }

  const monthlyRate = (annualRate / 100) / 12;
  const numberOfPayments = loanYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPayment = (loanAmount * monthlyRate * x) / (x - 1);
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalPayment').textContent = totalPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalInterest').textContent = totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('paymentCount').textContent = numberOfPayments;
  document.getElementById('principalAmount').textContent = loanAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function clearAll() {
  document.getElementById('loanAmount').value = '';
  document.getElementById('interestRate').value = '';
  document.getElementById('loanTerm').value = '';
  document.getElementById('monthlyPayment').textContent = '0';
  document.getElementById('totalPayment').textContent = '0';
  document.getElementById('totalInterest').textContent = '0';
  document.getElementById('paymentCount').textContent = '0';
  document.getElementById('principalAmount').textContent = '0';
}

function resetDefaults() {
  document.getElementById('loanAmount').value = '200000';
  document.getElementById('interestRate').value = '5';
  document.getElementById('loanTerm').value = '30';
  calculateLoan();
}

document.getElementById('loanAmount').addEventListener('input', calculateLoan);
document.getElementById('interestRate').addEventListener('input', calculateLoan);
document.getElementById('loanTerm').addEventListener('input', calculateLoan);

// Initial calculation
calculateLoan();