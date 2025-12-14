
const diceResult = document.getElementById("diceResult");
const diceCountInput = document.getElementById("diceCount");

// Unicode dice icons ⚀-⚅
const diceIcons = [
  "\u2680",
  "\u2681",
  "\u2682",
  "\u2683",
  "\u2684",
  "\u2685",
];

// Assign random color to each dice
function randomColor() {
  const colors = [
    "#e53e3e",
    "#38a169",
    "#3182ce",
    "#d69e2e",
    "#805ad5",
    "#ed64a6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function rollDice() {
  const count = parseInt(diceCountInput.value) || 1;
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const icon = diceIcons[Math.floor(Math.random() * 6)];
    const color = randomColor();
    rolls.push(`<span style="color:${color}">${icon}</span>`);
  }
  diceResult.innerHTML = rolls.join(" ");
}

// Auto-roll on input change
diceCountInput.addEventListener("input", rollDice);
function clearDice() {
  diceResult.innerHTML = "";
}

rollDice();