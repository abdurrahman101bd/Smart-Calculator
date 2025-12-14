function calculateLove(){
  const name1 = document.getElementById('name1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  const resultText = document.getElementById('resultText');
  const progressFill = document.getElementById('progressFill');

  if(!name1 || !name2){
    resultText.innerHTML = 'Please enter both names <span class="heart">💖</span>';
    progressFill.style.width = '0%';
    return;
  }

  // Random love percentage with some romantic variation
  let percentage = Math.floor(Math.random() * 101);
  // If both names start with same letter, add bonus
  if(name1[0].toUpperCase() === name2[0].toUpperCase()) percentage = Math.min(percentage+10,100);

  resultText.innerHTML = `Love Percentage: ${percentage}% <span class="heart">💖</span>`;
  progressFill.style.width = `${percentage}%`;
}

function clearNames(){
  document.getElementById('name1').value = '';
  document.getElementById('name2').value = '';
  document.getElementById('resultText').innerHTML = 'Love Percentage: --% <span class="heart">💖</span>';
  document.getElementById('progressFill').style.width = '0%';
}

// Initialize default calculation
calculateLove();