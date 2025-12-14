const startYear = document.getElementById('startYear');
const startMonth = document.getElementById('startMonth');
const startDay = document.getElementById('startDay');
const endYear = document.getElementById('endYear');
const endMonth = document.getElementById('endMonth');
const endDay = document.getElementById('endDay');
// Populate years (current year → 1900)
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1900; y--) {
  startYear.innerHTML += `<option value="${y}">${y}</option>`;
  endYear.innerHTML += `<option value="${y}">${y}</option>`;
}
// Populate months
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
months.forEach((m, i) => {
  startMonth.innerHTML += `<option value="${i+1}">${m}</option>`;
  endMonth.innerHTML += `<option value="${i+1}">${m}</option>`;
});

function updateDays(yearSelect, monthSelect, daySelect) {
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

function getSelectedDate(yearSelect, monthSelect, daySelect) {
  if (!yearSelect.value) return null;
  const year = yearSelect.value;
  const month = String(monthSelect.value).padStart(2, '0');
  const day = String(daySelect.value).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculate() {
  const startDateStr = getSelectedDate(startYear, startMonth, startDay);
  const endDateStr = getSelectedDate(endYear, endMonth, endDay);

  if (!startDateStr || !endDateStr) {
    resetResults();
    return;
  }
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate time difference in milliseconds
  const timeDiff = Math.abs(endDate - startDate);

  // Calculate different units
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(timeDiff / (1000 * 60));

  // Calculate years, months, and remaining days
  let years = endDate.getFullYear() - startDate.getFullYear();
  let monthsDiff = endDate.getMonth() - startDate.getMonth();
  let daysDiff = endDate.getDate() - startDate.getDate();

  if (daysDiff < 0) {
    monthsDiff--;
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    daysDiff += prevMonth.getDate();
  }

  if (monthsDiff < 0) {
    years--;
    monthsDiff += 12;
  }
  // Display results
  document.getElementById('totalDays').textContent = totalDays.toLocaleString();
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = `${years * 12 + monthsDiff} (${years}y ${monthsDiff}m)`;
  document.getElementById('weeks').textContent = totalWeeks.toLocaleString();
  document.getElementById('days').textContent = totalDays.toLocaleString();
  document.getElementById('hours').textContent = totalHours.toLocaleString();
  document.getElementById('minutes').textContent = totalMinutes.toLocaleString();
}

function resetResults() {
  document.getElementById('totalDays').textContent = '0';
  document.getElementById('years').textContent = '0';
  document.getElementById('months').textContent = '0';
  document.getElementById('weeks').textContent = '0';
  document.getElementById('days').textContent = '0';
  document.getElementById('hours').textContent = '0';
  document.getElementById('minutes').textContent = '0';
}

function clearAll() {
  startYear.selectedIndex = 0;
  startMonth.selectedIndex = 0;
  endYear.selectedIndex = 0;
  endMonth.selectedIndex = 0;
  updateDays(startYear, startMonth, startDay);
  updateDays(endYear, endMonth, endDay);
  resetResults();
}

function setToday() {
  const today = new Date();
  endYear.value = today.getFullYear();
  endMonth.value = today.getMonth() + 1;
  updateDays(endYear, endMonth, endDay);
  endDay.value = today.getDate();
  calculate();
}

startYear.addEventListener('change', () => {
  updateDays(startYear, startMonth, startDay);
  calculate();
});

startMonth.addEventListener('change', () => {
  updateDays(startYear, startMonth, startDay);
  calculate();
});

startDay.addEventListener('change', calculate);
endYear.addEventListener('change', () => {
  updateDays(endYear, endMonth, endDay);
  calculate();
});

endMonth.addEventListener('change', () => {
  updateDays(endYear, endMonth, endDay);
  calculate();
});

endDay.addEventListener('change', calculate);

// Initialize days
updateDays(startYear, startMonth, startDay);
updateDays(endYear, endMonth, endDay);