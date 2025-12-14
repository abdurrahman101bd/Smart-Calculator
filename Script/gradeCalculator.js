function addGrade() {
  const container = document.getElementById('gradesContainer');
  const newGrade = document.createElement('div');
  newGrade.className = 'grade-item';
  newGrade.innerHTML = `
    <input type="text" class="grade-input" placeholder="Subject">
    <input type="number" class="grade-input" placeholder="Grade %" min="0" max="100">
    <button class="delete-btn" onclick="deleteGrade(this)">×</button>
  `;
  container.appendChild(newGrade);
}

function deleteGrade(btn) {
  const container = document.getElementById('gradesContainer');
  if (container.children.length > 1) {
    btn.parentElement.remove();
    calculateGPA();
  }
}

function calculateGPA() {
  const gradeItems = document.querySelectorAll('.grade-item');
  let totalPercent = 0;
  let count = 0;

  gradeItems.forEach(item => {
    const gradeInput = item.querySelectorAll('.grade-input')[1];
    const grade = parseFloat(gradeInput.value);

    if (!isNaN(grade) && grade >= 0 && grade <= 100) {
      totalPercent += grade;
      count++;
    }
  });

  if (count === 0) {
    document.getElementById('percentValue').textContent = '0%';
    document.getElementById('gpaValue').textContent = '0.0';
    return;
  }

  const avgPercent = totalPercent / count;
  document.getElementById('percentValue').textContent = avgPercent.toFixed(1) + '%';

  let gpa = 0;
  if (avgPercent >= 93) gpa = 4.0;
  else if (avgPercent >= 90) gpa = 3.7;
  else if (avgPercent >= 87) gpa = 3.3;
  else if (avgPercent >= 83) gpa = 3.0;
  else if (avgPercent >= 80) gpa = 2.7;
  else if (avgPercent >= 77) gpa = 2.3;
  else if (avgPercent >= 73) gpa = 2.0;
  else if (avgPercent >= 70) gpa = 1.7;
  else if (avgPercent >= 67) gpa = 1.3;
  else if (avgPercent >= 60) gpa = 1.0;
  else gpa = 0.0;

  document.getElementById('gpaValue').textContent = gpa.toFixed(1);
}

function clearAll() {
  const inputs = document.querySelectorAll('.grade-input');
  inputs.forEach(input => input.value = '');
  calculateGPA();
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('grade-input')) {
    calculateGPA();
  }
});

calculateGPA();