const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>/?";

const lengthInput = document.getElementById('lengthInput');
const lengthValue = document.getElementById('lengthValue');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthFill = document.getElementById('strengthFill');

const options = ['uppercase','lowercase','numbers','symbols'];

function generatePassword(){
  const length = parseInt(lengthInput.value);
  let charSet = "";
  if(document.getElementById('uppercase').checked) charSet += uppercaseChars;
  if(document.getElementById('lowercase').checked) charSet += lowercaseChars;
  if(document.getElementById('numbers').checked) charSet += numberChars;
  if(document.getElementById('symbols').checked) charSet += symbolChars;

  if(charSet === "") return passwordDisplay.textContent="Select at least one option";

  let password = "";
  for(let i=0;i<length;i++){
    password += charSet.charAt(Math.floor(Math.random()*charSet.length));
  }
  passwordDisplay.textContent=password;
  updateStrength(password);
}

function copyPassword(){
  const copyBtn = document.querySelector('.buttons-grid .btn:first-child');
  const password = passwordDisplay.textContent;

  navigator.clipboard.writeText(password).then(()=>{
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#48bb78";
    copyBtn.style.color = "white";

    setTimeout(()=>{
      copyBtn.textContent = originalText;
      copyBtn.style.background = "#667eea";
      copyBtn.style.color = "white";
    }, 1500);
  });
}

function updateStrength(password){
  let score=0;
  if(/[A-Z]/.test(password)) score++;
  if(/[a-z]/.test(password)) score++;
  if(/[0-9]/.test(password)) score++;
  if(/[^A-Za-z0-9]/.test(password)) score++;
  let strength = (password.length/32)*0.5 + (score/4)*0.5; // 0-1
  strengthFill.style.width = (strength*100)+'%';
  if(strength<0.3) strengthFill.style.background="#f56565";
  else if(strength<0.6) strengthFill.style.background="#ecc94b";
  else strengthFill.style.background="#48bb78";
}

// Event Listeners for auto-generate
lengthInput.addEventListener('input',()=>{lengthValue.textContent=lengthInput.value; generatePassword();});
options.forEach(opt=>document.getElementById(opt).addEventListener('change',generatePassword));

generatePassword(); // initial password