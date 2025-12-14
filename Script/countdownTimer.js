let countdownInterval = null;
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
// Populate years (current year + 10 years)
const currentYear = new Date().getFullYear();
for (let y = currentYear; y <= currentYear + 10; y++) {
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
  const year = yearSelect.value;
  const month = monthSelect.value;
  const day = daySelect.value;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function updateCountdown() {
  const eventName = document.getElementById('eventName').value || 'Event';
  const eventDateStr = getSelectedDate();
  const eventTimeInput = document.getElementById('eventTime').value || '00:00';

  document.getElementById('displayEventName').textContent = eventName;

  if (!yearSelect.value) {
    document.getElementById('statusText').textContent = 'Set a date to start countdown';
    return;
  }
  const eventDateTime = new Date(`${eventDateStr}T${eventTimeInput}`);
  const now = new Date();
  const timeDiff = eventDateTime - now;
  if (timeDiff < 0) {
    document.getElementById('statusText').textContent = 'Event has passed!';
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    stopCountdown();
    return;
  }
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  document.getElementById('statusText').textContent = 'Counting down...';
}

function startCountdown() {
  if (countdownInterval) return;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  document.getElementById('statusText').textContent = 'Countdown stopped';
}

function clearAll() {
  stopCountdown();
  document.getElementById('eventName').value = '';
  yearSelect.selectedIndex = 0;
  monthSelect.selectedIndex = 0;
  updateDays();
  document.getElementById('eventTime').value = '00:00';
  document.getElementById('displayEventName').textContent = 'Event';
  document.getElementById('days').textContent = '0';
  document.getElementById('hours').textContent = '0';
  document.getElementById('minutes').textContent = '0';
  document.getElementById('seconds').textContent = '0';
  document.getElementById('statusText').textContent = 'Set a date to start countdown';
}

function setDefaultEvent() {
  stopCountdown();
  document.getElementById('eventName').value = 'New Year 2026';
  yearSelect.value = '2026';
  monthSelect.value = '1';
  updateDays();
  daySelect.value = '1';
  document.getElementById('eventTime').value = '00:00';
  document.getElementById('displayEventName').textContent = 'New Year 2026';
}

yearSelect.addEventListener('change', updateDays);
monthSelect.addEventListener('change', updateDays);
// Initialize to New Year 2026
yearSelect.value = '2026';
monthSelect.value = '1';
updateDays();
daySelect.value = '1';