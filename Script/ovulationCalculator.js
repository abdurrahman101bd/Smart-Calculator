const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
// Populate years (current year and previous year)
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 1; y--) {
  yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
}
// Populate months
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
months.forEach((m, i) => {
  monthSelect.innerHTML += `<option value="${i+1}">${m}</option>`;
});

function updateDays() {
  const year = yearSelect.value || currentYear;
  const month = monthSelect.value || 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const currentDay = daySelect.value || 1;
  daySelect.innerHTML = '';
  for (let d = 1; d <= daysInMonth; d++) {
    daySelect.innerHTML += `<option value="${d}">${d}</option>`;
  }

  if (currentDay <= daysInMonth) {
    daySelect.value = currentDay;
  }
}

function getSelectedDate() {
  if (!yearSelect.value) return null;
  const year = yearSelect.value;
  const month = String(monthSelect.value).padStart(2, '0');
  const day = String(daySelect.value).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function calculate() {
  const lastPeriodStr = getSelectedDate();
  const cycleLength = parseInt(document.getElementById('cycleLength').value) || 28;

  if (!lastPeriodStr) {
    document.getElementById('ovulationDate').textContent = 'Select Date';
    document.getElementById('windowStart').textContent = '-';
    document.getElementById('peakFertility').textContent = '-';
    document.getElementById('windowEnd').textContent = '-';
    document.getElementById('nextPeriod').textContent = '-';
    return;
  }
  const lastPeriod = new Date(lastPeriodStr);

  // Ovulation typically occurs 14 days before next period
  const ovulationDay = new Date(lastPeriod);
  ovulationDay.setDate(lastPeriod.getDate() + cycleLength - 14);

  // Fertility window: 5 days before ovulation to 1 day after
  const windowStart = new Date(ovulationDay);
  windowStart.setDate(ovulationDay.getDate() - 5);

  const windowEnd = new Date(ovulationDay);
  windowEnd.setDate(ovulationDay.getDate() + 1);

  // Peak fertility: 2-3 days before ovulation
  const peakStart = new Date(ovulationDay);
  peakStart.setDate(ovulationDay.getDate() - 3);
  const peakEnd = new Date(ovulationDay);
  peakEnd.setDate(ovulationDay.getDate() - 1);

  // Next period
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
  document.getElementById('ovulationDate').textContent = formatDate(ovulationDay);
  document.getElementById('windowStart').textContent = formatDate(windowStart);
  document.getElementById('peakFertility').textContent = `${formatDate(peakStart)} - ${formatDate(peakEnd)}`;
  document.getElementById('windowEnd').textContent = formatDate(windowEnd);
  document.getElementById('nextPeriod').textContent = formatDate(nextPeriod);
}

function clearAll() {
  yearSelect.selectedIndex = 0;
  monthSelect.selectedIndex = 0;
  updateDays();
  document.getElementById('cycleLength').value = '28';
  calculate();
}

function setToday() {
  const today = new Date();
  yearSelect.value = today.getFullYear();
  monthSelect.value = today.getMonth() + 1;
  updateDays();
  daySelect.value = today.getDate();
  calculate();
}

yearSelect.addEventListener('change', () => {
  updateDays();
  calculate();
});

monthSelect.addEventListener('change', () => {
  updateDays();
  calculate();
});

daySelect.addEventListener('change', calculate);
document.getElementById('cycleLength').addEventListener('input', calculate);

// Initialize
updateDays();