let currentMode = "prime";

function switchMode(mode) {
  currentMode = mode;
  document
    .querySelectorAll(".mode-tab")
    .forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");

  document.getElementById("primeMode").style.display = "none";
  document.getElementById("lcmgcfMode").style.display = "none";
  document.getElementById("quadraticMode").style.display = "none";
  document.getElementById("logMode").style.display = "none";

  if (mode === "prime")
    document.getElementById("primeMode").style.display = "block";
  else if (mode === "lcmgcf")
    document.getElementById("lcmgcfMode").style.display = "block";
  else if (mode === "quadratic")
    document.getElementById("quadraticMode").style.display = "block";
  else if (mode === "log")
    document.getElementById("logMode").style.display = "block";

  calculate();
}

function primeFactorization(n) {
  n = Math.abs(Math.floor(n));
  if (n < 2) return {};
  const factors = {};
  let divisor = 2;
  while (n >= 2) {
    if (n % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

function gcd(a, b) {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs((a * b) / gcd(a, b));
}

function calculate() {
  if (currentMode === "prime") {
    const num = parseFloat(document.getElementById("primeNumber").value) || 2;
    const factors = primeFactorization(num);
    const resultDiv = document.getElementById("primeResult");
    resultDiv.innerHTML = "";
    if (Object.keys(factors).length === 0) {
      resultDiv.innerHTML = '<span class="factor-badge">Invalid</span>';
    } else {
      for (let prime in factors) {
        const exp = factors[prime];
        const badge = document.createElement("span");
        badge.className = "factor-badge";
        badge.textContent =
          exp > 1 ? `${prime}${String.fromCharCode(0x2070 + exp)}` : prime;
        if (exp === 2) badge.textContent = `${prime}²`;
        else if (exp === 3) badge.textContent = `${prime}³`;
        else if (exp > 3) badge.textContent = `${prime}^${exp}`;
        resultDiv.appendChild(badge);
      }
    }
  } else if (currentMode === "lcmgcf") {
    const num1 = parseFloat(document.getElementById("lcmNum1").value) || 1;
    const num2 = parseFloat(document.getElementById("lcmNum2").value) || 1;
    const gcfVal = gcd(num1, num2);
    const lcmVal = lcm(num1, num2);
    document.getElementById("gcfResult").textContent = gcfVal;
    document.getElementById("lcmResult").textContent = lcmVal;
  } else if (currentMode === "quadratic") {
    const a = parseFloat(document.getElementById("quadA").value) || 1;
    const b = parseFloat(document.getElementById("quadB").value) || 0;
    const c = parseFloat(document.getElementById("quadC").value) || 0;
    if (a === 0) {
      document.getElementById("quadX1").textContent = "Invalid";
      document.getElementById("quadX2").textContent = "a ≠ 0";
      document.getElementById("quadDisc").textContent = "-";
      return;
    }
    const discriminant = b * b - 4 * a * c;
    document.getElementById("quadDisc").textContent = discriminant.toFixed(2);
    if (discriminant < 0) {
      const realPart = (-b / (2 * a)).toFixed(2);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
      document.getElementById(
        "quadX1"
      ).textContent = `${realPart} + ${imagPart}i`;
      document.getElementById(
        "quadX2"
      ).textContent = `${realPart} - ${imagPart}i`;
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      document.getElementById("quadX1").textContent = x1.toFixed(2);
      document.getElementById("quadX2").textContent = x2.toFixed(2);
    }
  } else if (currentMode === "log") {
    const value = parseFloat(document.getElementById("logValue").value) || 1;
    const base = parseFloat(document.getElementById("logBase").value) || 10;
    if (value <= 0 || base <= 0 || base === 1) {
      document.getElementById("logResult").textContent = "Invalid";
      document.getElementById("lnResult").textContent = "Invalid";
      return;
    }
    const logResult = Math.log(value) / Math.log(base);
    const lnResult = Math.log(value);
    document.getElementById("logResult").textContent = logResult.toFixed(4);
    document.getElementById("lnResult").textContent = lnResult.toFixed(4);
  }
}

function clearAll() {
  if (currentMode === "prime") {
    document.getElementById("primeNumber").value = "";
  } else if (currentMode === "lcmgcf") {
    document.getElementById("lcmNum1").value = "";
    document.getElementById("lcmNum2").value = "";
  } else if (currentMode === "quadratic") {
    document.getElementById("quadA").value = "";
    document.getElementById("quadB").value = "";
    document.getElementById("quadC").value = "";
  } else if (currentMode === "log") {
    document.getElementById("logValue").value = "";
    document.getElementById("logBase").value = "";
  }
  calculate();
}

function resetDefaults() {
  if (currentMode === "prime") {
    document.getElementById("primeNumber").value = "60";
  } else if (currentMode === "lcmgcf") {
    document.getElementById("lcmNum1").value = "12";
    document.getElementById("lcmNum2").value = "18";
  } else if (currentMode === "quadratic") {
    document.getElementById("quadA").value = "1";
    document.getElementById("quadB").value = "-3";
    document.getElementById("quadC").value = "2";
  } else if (currentMode === "log") {
    document.getElementById("logValue").value = "100";
    document.getElementById("logBase").value = "10";
  }
  calculate();
}
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-field")) calculate();
});

calculate();
