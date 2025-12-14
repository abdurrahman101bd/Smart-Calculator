function generateRandom() {
  const min = parseInt(document.getElementById('minInput').value);
  const max = parseInt(document.getElementById('maxInput').value);
  const output = document.getElementById('outputDisplay');

  if(isNaN(min) || isNaN(max)) {
    output.textContent = "Enter valid numbers";
    return;
  }
  if(min > max) {
    output.textContent = "Min cannot be greater than Max";
    return;
  }

  const rand = Math.floor(Math.random() * (max - min + 1)) + min;
  output.textContent = rand;
}

function copyResult(){
  const output = document.getElementById('outputDisplay').textContent;
  const copyBtn = document.querySelector('.copy-btn');

  navigator.clipboard.writeText(output).then(()=>{
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#48bb78";
    copyBtn.style.color = "white";

    setTimeout(()=>{
      copyBtn.textContent = originalText;
      copyBtn.style.background = "#e0e5ec";
      copyBtn.style.color = "#2d3748";
    }, 2000);
  });
}

function clearAll(){
  document.getElementById('minInput').value = '';
  document.getElementById('maxInput').value = '';
  document.getElementById('outputDisplay').textContent = 'Random Number';
}

// Auto-generate on input change
document.getElementById('minInput').addEventListener('input', generateRandom);
document.getElementById('maxInput').addEventListener('input', generateRandom);

// Initial random number
generateRandom();