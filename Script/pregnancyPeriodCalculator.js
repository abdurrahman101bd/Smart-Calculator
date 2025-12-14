let currentMode = 'pregnancy';

/* MODE SWITCH */
function switchMode(mode, btn) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  ['pregnancy', 'duedate', 'period'].forEach(m => {
    document.getElementById(m + 'Mode').style.display = 'none';
  });
  document.getElementById(mode + 'Mode').style.display = 'block';
}

/* DATE PICKER INIT */
function initDatePickers() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();

  document.querySelectorAll('.date-row').forEach(box => {
    const y = box.querySelector('.year');
    const m = box.querySelector('.month');
    const d = box.querySelector('.day');

    // Populate year
    y.innerHTML = '<option value="">Year</option>';
    for (let i = currentYear; i >= 1900; i--) {
      y.innerHTML += `<option value="${i}">${i}</option>`;
    }

    // Populate month
    m.innerHTML = '<option value="">Month</option>';
    months.forEach((mo, i) => {
      m.innerHTML += `<option value="${i + 1}">${mo}</option>`;
    });

    // Update days
    function updateDays() {
      d.innerHTML = '';
      if (!y.value || !m.value) return;
      const monthIndex = parseInt(m.value) - 1;
      const daysInMonth = new Date(y.value, monthIndex + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        d.innerHTML += `<option value="${i}">${i}</option>`;
      }
    }

    y.addEventListener('change', () => { updateDays(); calculate(); });
    m.addEventListener('change', () => { updateDays(); calculate(); });

    // Initial call
    updateDays();
  });
}

/* GET SELECTED DATE */
function getDate(key) {
  const box = document.querySelector(`[data-date="${key}"]`);
  if (!box) return null;
  const y = box.querySelector('.year').value;
  const m = box.querySelector('.month').value;
  const d = box.querySelector('.day').value;
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/* FORMAT DATE */
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/* CALCULATE LOGIC */
function calculate() {
  const cycleLengthInput = document.getElementById('cycleLength');
  const periodLengthInput = document.getElementById('periodLength');
  const today = new Date();

  if (currentMode === 'pregnancy') {
    const lmp = getDate('lmp');
    if (!lmp) return;

    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);

    const daysPassed = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(daysPassed / 7);
    const daysExtra = daysPassed % 7;
    const trimester = weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3;

    document.getElementById('pregResult').textContent = formatDate(due).split(',')[1].trim();

    document.getElementById('pregInfo').innerHTML = `
      <div class="info-item"><span class="info-label">Weeks Pregnant:</span><span class="info-value">${weeksPregnant}w ${daysExtra}d</span></div>
      <div class="info-item"><span class="info-label">Trimester:</span><span class="info-value">${trimester}${trimester === 1 ? 'st' : trimester === 2 ? 'nd' : 'rd'} Trimester</span></div>
      <div class="info-item"><span class="info-label">Days Until Due:</span><span class="info-value">${Math.max(0, Math.floor((due - today) / (1000 * 60 * 60 * 24)))} days</span></div>
      <div class="info-item"><span class="info-label">Full Due Date:</span><span class="info-value">${formatDate(due)}</span></div>
    `;
  }

  if (currentMode === 'duedate') {
    const due = getDate('dueDate');
    if (!due) return;

    const lmp = new Date(due);
    lmp.setDate(lmp.getDate() - 280);

    const conceptionDate = new Date(lmp);
    conceptionDate.setDate(conceptionDate.getDate() + 14);

    document.getElementById('dueResult').textContent = formatDate(lmp).split(',')[1].trim();

    document.getElementById('dueInfo').innerHTML = `
      <div class="info-item"><span class="info-label">Full LMP Date:</span><span class="info-value">${formatDate(lmp)}</span></div>
      <div class="info-item"><span class="info-label">Est. Conception:</span><span class="info-value">${formatDate(conceptionDate)}</span></div>
      <div class="info-item"><span class="info-label">Due Date:</span><span class="info-value">${formatDate(due)}</span></div>
    `;
  }

  if (currentMode === 'period') {
    const lp = getDate('lastPeriod');
    if (!lp) return;

    const cycleLength = parseInt(cycleLengthInput.value) || 28;
    const periodLength = parseInt(periodLengthInput.value) || 5;

    const next = new Date(lp);
    next.setDate(next.getDate() + cycleLength);

    const ovulation = new Date(lp);
    ovulation.setDate(ovulation.getDate() + Math.floor(cycleLength / 2));

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const daysUntil = Math.max(0, Math.floor((next - today) / (1000 * 60 * 60 * 24)));

    document.getElementById('periodResult').textContent = formatDate(next).split(',')[1].trim();

    document.getElementById('periodInfo').innerHTML = `
      <div class="info-item"><span class="info-label">Days Until Period:</span><span class="info-value">${daysUntil} days</span></div>
      <div class="info-item"><span class="info-label">Ovulation Day:</span><span class="info-value">${formatDate(ovulation)}</span></div>
      <div class="info-item"><span class="info-label">Fertile Window:</span><span class="info-value">${fertileStart.getDate()} - ${fertileEnd.getDate()} ${fertileStart.toLocaleString('en-US', { month: 'short' })}</span></div>
      <div class="info-item"><span class="info-label">Period Duration:</span><span class="info-value">${periodLength} days</span></div>
    `;
  }
}

/* CLEAR ALL INPUTS */
function clearAll() {
  document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
  document.querySelectorAll('input[type=number]').forEach(i => i.value = '');
  document.querySelectorAll('.result-display').forEach(r => r.textContent = '-');
  document.querySelectorAll('.info-grid').forEach(i => i.innerHTML = '');
}

/* SET TODAY */
function setToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const box = document.querySelector(`[data-date="${currentMode === 'pregnancy' ? 'lmp' : currentMode === 'duedate' ? 'dueDate' : 'lastPeriod'}"]`);
  if (!box) return;

  box.querySelector('.year').value = year;
  box.querySelector('.month').value = month;
  const event = new Event('change');
  box.querySelector('.month').dispatchEvent(event);
  box.querySelector('.day').value = day;

  calculate();
}

/* INIT DATE PICKERS ON LOAD */
initDatePickers();