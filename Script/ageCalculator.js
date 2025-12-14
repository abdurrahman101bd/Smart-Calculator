const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

// Populate year, month, day selects
function populateDate(
  selectYear,
  selectMonth,
  selectDay,
  startYear = 1900,
  endYear = currentYear
) {
  const yearSelect = document.getElementById(selectYear);
  const monthSelect = document.getElementById(selectMonth);
  const daySelect = document.getElementById(selectDay);

  for (let y = endYear; y >= startYear; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.text = y;
    yearSelect.appendChild(opt);
  }

  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.text = m;
    monthSelect.appendChild(opt);
  }

  updateDays(yearSelect, monthSelect, daySelect);
  yearSelect.addEventListener("change", () =>
    updateDays(yearSelect, monthSelect, daySelect)
  );
  monthSelect.addEventListener("change", () =>
    updateDays(yearSelect, monthSelect, daySelect)
  );
}

// Update day options based on month/year
function updateDays(yearSelect, monthSelect, daySelect) {
  const y = parseInt(yearSelect.value);
  const m = parseInt(monthSelect.value);
  const daysInMonth = new Date(y, m, 0).getDate();
  daySelect.innerHTML = "";
  for (let d = 1; d <= daysInMonth; d++) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.text = d;
    daySelect.appendChild(opt);
  }
}

// Set today for current date selects
function setToday() {
  document.getElementById("currentYear").value = currentYear;
  document.getElementById("currentMonth").value = currentMonth;
  document.getElementById("currentDay").value = currentDay;
  if (document.getElementById("birthYear").value) calculateAge();
}

// Clear all inputs
function clearAll() {
  document.getElementById("birthYear").value = "";
  document.getElementById("birthMonth").value = "";
  document.getElementById("birthDay").value = "";
  setToday();
  document.getElementById("years").textContent = "0";
  document.getElementById("months").textContent = "0";
  document.getElementById("days").textContent = "0";
  document.getElementById("totalMonths").textContent = "0";
  document.getElementById("totalWeeks").textContent = "0";
  document.getElementById("totalDays").textContent = "0";
  document.getElementById("totalHours").textContent = "0";
  document.getElementById("nextBirthday").textContent = "-";
}

// Calculate age
function calculateAge() {
  const birthDate = new Date(
    parseInt(document.getElementById("birthYear").value),
    parseInt(document.getElementById("birthMonth").value) - 1,
    parseInt(document.getElementById("birthDay").value)
  );

  const currentDate = new Date(
    parseInt(document.getElementById("currentYear").value),
    parseInt(document.getElementById("currentMonth").value) - 1,
    parseInt(document.getElementById("currentDay").value)
  );

  if (!birthDate || !currentDate || birthDate > currentDate) {
    alert("Please select valid dates");
    return;
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;

  const totalDays = Math.floor(
    (currentDate - birthDate) / (1000 * 60 * 60 * 24)
  );
  const totalMonths = years * 12 + months;
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  document.getElementById("totalMonths").textContent =
    totalMonths.toLocaleString();
  document.getElementById("totalWeeks").textContent =
    totalWeeks.toLocaleString();
  document.getElementById("totalDays").textContent = totalDays.toLocaleString();
  document.getElementById("totalHours").textContent =
    totalHours.toLocaleString();

  let nextBirthday = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (nextBirthday < currentDate)
    nextBirthday.setFullYear(currentDate.getFullYear() + 1);
  const daysUntilBirthday = Math.floor(
    (nextBirthday - currentDate) / (1000 * 60 * 60 * 24)
  );
  document.getElementById(
    "nextBirthday"
  ).textContent = `${daysUntilBirthday} days`;
}

populateDate("birthYear", "birthMonth", "birthDay", 1900, currentYear);
populateDate("currentYear", "currentMonth", "currentDay", 1900, currentYear);
setToday();
