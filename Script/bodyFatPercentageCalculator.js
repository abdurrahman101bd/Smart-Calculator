let gender = "male";

function setGender(g) {
  gender = g;
  document
    .querySelectorAll(".radio-group")[0]
    .querySelectorAll(".radio-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  event.target.classList.add("active");

  document.getElementById("hipSection").style.display =
    g === "female" ? "block" : "none";
  calculate();
}

function getCategory(percent, isMale) {
  if (isMale) {
    if (percent < 6) return "Essential Fat";
    if (percent < 14) return "Athletes";
    if (percent < 18) return "Fitness";
    if (percent < 25) return "Average";
    return "Obese";
  } else {
    if (percent < 14) return "Essential Fat";
    if (percent < 21) return "Athletes";
    if (percent < 25) return "Fitness";
    if (percent < 32) return "Average";
    return "Obese";
  }
}

function calculate() {
  const waist = parseFloat(document.getElementById("waist").value) || 0;
  const neck = parseFloat(document.getElementById("neck").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const hip = parseFloat(document.getElementById("hip").value) || 0;

  if (waist === 0 || neck === 0 || height === 0) {
    document.getElementById("bodyFatPercent").textContent = "0%";
    document.getElementById("category").textContent = "-";
    document.getElementById("fatMass").textContent = "-";
    document.getElementById("leanMass").textContent = "-";
    return;
  }
  let bodyFat = 0;
  // US Navy Method
  if (gender === "male") {
    bodyFat =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else {
    if (hip === 0) {
      document.getElementById("bodyFatPercent").textContent = "Enter Hip";
      return;
    }
    bodyFat =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
      450;
  }
  const category = getCategory(bodyFat, gender === "male");
  document.getElementById("bodyFatPercent").textContent =
    bodyFat.toFixed(1) + "%";
  document.getElementById("category").textContent = category;
  document.getElementById("fatMass").textContent = "N/A (weight needed)";
  document.getElementById("leanMass").textContent = "N/A (weight needed)";
}

function clearAll() {
  document.getElementById("waist").value = "";
  document.getElementById("neck").value = "";
  document.getElementById("height").value = "";
  document.getElementById("hip").value = "";
  calculate();
}

function resetDefaults() {
  document.getElementById("waist").value = "85";
  document.getElementById("neck").value = "38";
  document.getElementById("height").value = "170";
  document.getElementById("hip").value = "95";
  calculate();
}

document.querySelectorAll(".input-field").forEach((input) => {
  input.addEventListener("input", calculate);
});

document.getElementById("hipSection").style.display = "none";

calculate();
