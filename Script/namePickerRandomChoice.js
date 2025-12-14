let names = [];
let isPicking = false;
function updateNamesList() {
  const input = document.getElementById('namesInput').value;
  names = input.split('\n').map(n => n.trim()).filter(n => n.length > 0);

  document.getElementById('nameCount').textContent = names.length;

  const listDiv = document.getElementById('namesList');
  listDiv.innerHTML = '';

  names.forEach((name, index) => {
    const tag = document.createElement('div');
    tag.className = 'name-tag';
    tag.innerHTML = `${name} <span class="remove-btn" onclick="removeName(${index})">×</span>`;
    listDiv.appendChild(tag);
  });
}

function removeName(index) {
  const input = document.getElementById('namesInput');
  const lines = input.value.split('\n');
  lines.splice(index, 1);
  input.value = lines.join('\n');
  updateNamesList();
}

function pickRandom() {
  if (isPicking) return;
  if (names.length === 0) {
    document.getElementById('result').textContent = 'Add names first!';
    return;
  }
  isPicking = true;
  const resultDiv = document.getElementById('result');
  resultDiv.classList.add('picking');

  let iterations = 0;
  const maxIterations = 20;

  const interval = setInterval(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    resultDiv.textContent = randomName;
    iterations++;

    if (iterations >= maxIterations) {
      clearInterval(interval);
      resultDiv.classList.remove('picking');

      // Highlight the winner in the list
      document.querySelectorAll('.name-tag').forEach(tag => {
        if (tag.textContent.includes(resultDiv.textContent)) {
          tag.classList.add('picked');
          setTimeout(() => tag.classList.remove('picked'), 2000);
        }
      });

      isPicking = false;
    }
  }, 100);
}

function clearAll() {
  document.getElementById('namesInput').value = '';
  document.getElementById('result').textContent = 'Click Pick!';
  updateNamesList();
}

function resetDefaults() {
  document.getElementById('namesInput').value = 'Alice\nBob\nCharlie\nDavid\nEmma';
  document.getElementById('result').textContent = 'Click Pick!';
  updateNamesList();
}

document.getElementById('namesInput').addEventListener('input', updateNamesList);
updateNamesList();