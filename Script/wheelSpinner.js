const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let options = [];
let rotation = 0;
let isSpinning = false;
const colors = ['#667eea', '#f6d365', '#fda085', '#a8edea', '#fed6e3', '#9ebd13', '#008ff7', '#f093fb'];
function drawWheel() {
  const input = document.getElementById('optionsInput').value;
  options = input.split('\n').map(o => o.trim()).filter(o => o.length > 0);

  if (options.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
  const sliceAngle = (2 * Math.PI) / options.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  options.forEach((option, i) => {
    const startAngle = i * sliceAngle + rotation;
    const endAngle = startAngle + sliceAngle;
    // Draw slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    // Draw border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Draw text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(option.substring(0, 12), radius * 0.65, 5);
    ctx.restore();
  });

  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#2d3748';
  ctx.fill();
}

function spinWheel() {
  if (isSpinning || options.length === 0) return;
  isSpinning = true;
  document.getElementById('winnerText').textContent = 'Spinning...';
  const spins = 5 + Math.random() * 5;
  const randomAngle = Math.random() * 2 * Math.PI;
  const totalRotation = spins * 2 * Math.PI + randomAngle;
  const startRotation = rotation;
  const startTime = Date.now();
  const duration = 4000;
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    rotation = startRotation + totalRotation * easeOut;
    drawWheel();
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotation = rotation % (2 * Math.PI);

      const sliceAngle = (2 * Math.PI) / options.length;
      const pointerAngle = (3 * Math.PI / 2) - rotation;
      const normalizedAngle = (pointerAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const winnerIndex = Math.floor(normalizedAngle / sliceAngle);

      document.getElementById('winnerText').textContent = '🎉 ' + options[winnerIndex] + ' 🎉';
      isSpinning = false;
    }
  }
  animate();
}

function clearAll() {
  document.getElementById('optionsInput').value = '';
  document.getElementById('winnerText').textContent = 'Spin the wheel!';
  rotation = 0;
  drawWheel();
}

function resetDefaults() {
  document.getElementById('optionsInput').value = 'Pizza\nBurger\nSushi\nPasta\nTacos';
  document.getElementById('winnerText').textContent = 'Spin the wheel!';
  rotation = 0;
  drawWheel();
}

document.getElementById('optionsInput').addEventListener('input', drawWheel);
drawWheel();