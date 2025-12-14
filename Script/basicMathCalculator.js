let currentMode = "fraction";

function switchMode(mode) {
  currentMode = mode;
  document
    .querySelectorAll(".mode-tab")
    .forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
  document.getElementById("fractionMode").style.display = "none";
  document.getElementById("averageMode").style.display = "none";
  document.getElementById("ratioMode").style.display = "none";
  document.getElementById("errorMode").style.display = "none";
  if (mode === "fraction")
    document.getElementById("fractionMode").style.display = "block";
  else if (mode === "average")
    document.getElementById("averageMode").style.display = "block";
  else if (mode === "ratio")
    document.getElementById("ratioMode").style.display = "block";
  else if (mode === "error")
    document.getElementById("errorMode").style.display = "block";
  calculate();
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function calculate() {
  if (currentMode === "fraction") {
    const num1 = parseFloat(document.getElementById("frac1num").value) || 0;
    const den1 = parseFloat(document.getElementById("frac1den").value) || 1;
    const num2 = parseFloat(document.getElementById("frac2num").value) || 0;
    const den2 = parseFloat(document.getElementById("frac2den").value) || 1;
    // Add fractions: a/b + c/d = (ad + bc) / bd
    const numerator = num1 * den2 + num2 * den1;
    const denominator = den1 * den2;
    // Simplify
    const divisor = gcd(numerator, denominator);
    const finalNum = numerator / divisor;
    const finalDen = denominator / divisor;
    document.getElementById(
      "fracResult"
    ).textContent = `${finalNum}/${finalDen}`;
  } else if (currentMode === "average") {
    const input = document.getElementById("avgNumbers").value;
    const numbers = input
      .split(",")
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      document.getElementById("avgResult").textContent = "0";
      return;
    }
    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = sum / numbers.length;
    document.getElementById("avgResult").textContent = average.toFixed(2);
  } else if (currentMode === "ratio") {
    const val1 = parseFloat(document.getElementById("ratio1").value) || 0;
    const val2 = parseFloat(document.getElementById("ratio2").value) || 1;
    const divisor = gcd(val1, val2);
    const simplified1 = val1 / divisor;
    const simplified2 = val2 / divisor;
    document.getElementById(
      "ratioResult"
    ).textContent = `${simplified1}:${simplified2}`;
  } else if (currentMode === "error") {
    const actual = parseFloat(document.getElementById("actual").value) || 0;
    const measured = parseFloat(document.getElementById("measured").value) || 0;
    if (actual === 0) {
      document.getElementById("errorResult").textContent = "Undefined";
      return;
    }
    const error = Math.abs((measured - actual) / actual) * 100;
    document.getElementById("errorResult").textContent = error.toFixed(2) + "%";
  }
}

function clearAll() {
  if (currentMode === "fraction") {
    document.getElementById("frac1num").value = "";
    document.getElementById("frac1den").value = "";
    document.getElementById("frac2num").value = "";
    document.getElementById("frac2den").value = "";
  } else if (currentMode === "average") {
    document.getElementById("avgNumbers").value = "";
  } else if (currentMode === "ratio") {
    document.getElementById("ratio1").value = "";
    document.getElementById("ratio2").value = "";
  } else if (currentMode === "error") {
    document.getElementById("actual").value = "";
    document.getElementById("measured").value = "";
  }
  calculate();
}
function resetDefaults() {
  if (currentMode === "fraction") {
    document.getElementById("frac1num").value = "1";
    document.getElementById("frac1den").value = "2";
    document.getElementById("frac2num").value = "1";
    document.getElementById("frac2den").value = "3";
  } else if (currentMode === "average") {
    document.getElementById("avgNumbers").value = "10, 20, 30, 40, 50";
  } else if (currentMode === "ratio") {
    document.getElementById("ratio1").value = "10";
    document.getElementById("ratio2").value = "15";
  } else if (currentMode === "error") {
    document.getElementById("actual").value = "100";
    document.getElementById("measured").value = "95";
  }
  calculate();
}

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-field")) calculate();
});

calculate();
