let headsCount = 0;
let tailsCount = 0;
let isFlipping = false;
function flipCoin() {
  if (isFlipping) return;

  isFlipping = true;
  const coin = document.getElementById('coin');
  const resultText = document.getElementById('resultText');
  const resultEmoji = document.getElementById('resultEmoji');
  coin.classList.add('flipping');
  resultText.textContent = 'Flipping...';
  resultEmoji.textContent = '';
  setTimeout(() => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    if (result === 'Heads') {
      headsCount++;
      coin.textContent = 'H';
      coin.style.background = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
      resultEmoji.textContent = '👑';
    } else {
      tailsCount++;
      coin.textContent = 'T';
      coin.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
      resultEmoji.textContent = '🎯';
    }
    resultText.textContent = result + '!';
    updateStats();

    coin.classList.remove('flipping');
    isFlipping = false;
  }, 1000);
}

function flipMultiple() {
  if (isFlipping) return;

  let count = 0;
  const interval = setInterval(() => {
    if (count < 5) {
      flipCoin();
      count++;
    } else {
      clearInterval(interval);
    }
  }, 1200);
}

function updateStats() {
  document.getElementById('headsCount').textContent = headsCount;
  document.getElementById('tailsCount').textContent = tailsCount;
  document.getElementById('totalCount').textContent = headsCount + tailsCount;
}

function resetStats() {
  headsCount = 0;
  tailsCount = 0;
  updateStats();

  const coin = document.getElementById('coin');
  const resultText = document.getElementById('resultText');
  const resultEmoji = document.getElementById('resultEmoji');

  coin.textContent = '?';
  coin.style.background = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
  resultText.textContent = 'Tap to flip!';
  resultEmoji.textContent = '';
}