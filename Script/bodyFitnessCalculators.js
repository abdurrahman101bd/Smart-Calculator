let currentMode = "bodyfat";

function switchMode(mode) {
  currentMode = mode;
  document
    .querySelectorAll(".mode-tab")
    .forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
  const waist = document.getElementById("waist");
  const neck = document.getElementById("neck");
  const hip = document.getElementById("hip");
  const weight = document.getElementById("weight");
  waist.style.display = "none";
  neck.style.display = "none";
  hip.style.display = "none";
  weight.style.display = "block";
  if (mode === "bodyfat") {
    waist.style.display = "block";
    neck.style.display = "block";
    const gender = document.getElementById("gender").value;
    if (gender === "female") {
      hip.style.display = "block";
    }
    document.getElementById("inputLabel").textContent = "Body Measurements";
  } else if (mode === "ideal") {
    weight.style.display = "none";
    document.getElementById("inputLabel").textContent = "Your Information";
  } else if (mode === "healthy") {
    weight.style.display = "none";
    document.getElementById("inputLabel").textContent = "Your Information";
  } else if (mode === "heartrate") {
    weight.style.display = "none";
    document.getElementById("inputLabel").textContent = "Your Information";
  }
  calculate();
}

function calculate() {
  const gender = document.getElementById("gender").value;
  const age = parseFloat(document.getElementById("age").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const waist = parseFloat(document.getElementById("waist").value) || 0;
  const neck = parseFloat(document.getElementById("neck").value) || 0;
  const hip = parseFloat(document.getElementById("hip").value) || 0;
  if (currentMode === "bodyfat") {
    let bodyFat;
    if (gender === "male") {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
    }
    let category = "";
    let categoryClass = "healthy";
    if (gender === "male") {
      if (bodyFat < 6) {
        category = "Essential Fat";
        categoryClass = "warning";
      } else if (bodyFat < 14) {
        category = "Athletic";
        categoryClass = "healthy";
      } else if (bodyFat < 18) {
        category = "Fitness";
        categoryClass = "healthy";
      } else if (bodyFat < 25) {
        category = "Average";
        categoryClass = "healthy";
      } else {
        category = "Obese";
        categoryClass = "danger";
      }
    } else {
      if (bodyFat < 14) {
        category = "Essential Fat";
        categoryClass = "warning";
      } else if (bodyFat < 21) {
        category = "Athletic";
        categoryClass = "healthy";
      } else if (bodyFat < 25) {
        category = "Fitness";
        categoryClass = "healthy";
      } else if (bodyFat < 32) {
        category = "Average";
        categoryClass = "healthy";
      } else {
        category = "Obese";
        categoryClass = "danger";
      }
    }
    document.getElementById("resultLabel").textContent = "Body Fat Percentage";
    document.getElementById("mainResult").textContent =
      bodyFat.toFixed(1) + "%";
    document.getElementById("category").textContent = category;
    document.getElementById("category").className =
      "result-category " + categoryClass;

    const fatMass = (bodyFat / 100) * weight;
    const leanMass = weight - fatMass;
    document.getElementById("breakdown").innerHTML = `
      <div class="breakdown-item"><span class="breakdown-value">${fatMass.toFixed(
        1
      )} kg</span><span class="breakdown-label">Fat Mass</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${leanMass.toFixed(
        1
      )} kg</span><span class="breakdown-label">Lean Mass</span></div>
    `;
  } else if (currentMode === "ideal") {
    // Robinson Formula
    let idealWeight;
    if (gender === "male") {
      idealWeight = 52 + 1.9 * (height / 2.54 - 60);
    } else {
      idealWeight = 49 + 1.7 * (height / 2.54 - 60);
    }
    const hamwi =
      gender === "male"
        ? 48 + 2.7 * (height / 2.54 - 60)
        : 45.5 + 2.2 * (height / 2.54 - 60);
    document.getElementById("resultLabel").textContent = "Ideal Body Weight";
    document.getElementById("mainResult").textContent =
      idealWeight.toFixed(1) + " kg";
    document.getElementById("category").textContent = "Recommended Range";
    document.getElementById("category").className = "result-category healthy";

    document.getElementById("breakdown").innerHTML = `
      <div class="breakdown-item"><span class="breakdown-value">${(
        idealWeight - 5
      ).toFixed(
        1
      )} kg</span><span class="breakdown-label">Lower Range</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${(
        idealWeight + 5
      ).toFixed(
        1
      )} kg</span><span class="breakdown-label">Upper Range</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${hamwi.toFixed(
        1
      )} kg</span><span class="breakdown-label">Hamwi Formula</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${idealWeight.toFixed(
        1
      )} kg</span><span class="breakdown-label">Robinson Formula</span></div>
    `;
  } else if (currentMode === "healthy") {
    const heightM = height / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    const idealBMI = 21.7;
    const idealWeight = idealBMI * heightM * heightM;
    document.getElementById("resultLabel").textContent = "Healthy Weight Range";
    document.getElementById("mainResult").textContent = `${minWeight.toFixed(
      1
    )} - ${maxWeight.toFixed(1)} kg`;
    document.getElementById("category").textContent = "BMI 18.5 - 24.9";
    document.getElementById("category").className = "result-category healthy";

    document.getElementById("breakdown").innerHTML = `
      <div class="breakdown-item"><span class="breakdown-value">${minWeight.toFixed(
        1
      )} kg</span><span class="breakdown-label">Minimum (BMI 18.5)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${maxWeight.toFixed(
        1
      )} kg</span><span class="breakdown-label">Maximum (BMI 24.9)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${idealWeight.toFixed(
        1
      )} kg</span><span class="breakdown-label">Ideal (BMI 21.7)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${(
        maxWeight - minWeight
      ).toFixed(
        1
      )} kg</span><span class="breakdown-label">Range Span</span></div>
    `;
  } else if (currentMode === "heartrate") {
    const maxHR = 220 - age;
    const restingHR = 70; // Average resting heart rate
    const reserve = maxHR - restingHR;

    const fatBurn = restingHR + reserve * 0.6;
    const cardio = restingHR + reserve * 0.75;
    const peak = restingHR + reserve * 0.9;
    document.getElementById("resultLabel").textContent = "Max Heart Rate";
    document.getElementById("mainResult").textContent = maxHR + " bpm";
    document.getElementById("category").textContent = "Training Zones";
    document.getElementById("category").className = "result-category healthy";

    document.getElementById("breakdown").innerHTML = `
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(
        fatBurn
      )} bpm</span><span class="breakdown-label">Fat Burn (60%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(
        cardio
      )} bpm</span><span class="breakdown-label">Cardio (75%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${Math.round(
        peak
      )} bpm</span><span class="breakdown-label">Peak (90%)</span></div>
      <div class="breakdown-item"><span class="breakdown-value">${reserve} bpm</span><span class="breakdown-label">Heart Rate Reserve</span></div>
    `;
  }
}

function clearAll() {
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("waist").value = "";
  document.getElementById("neck").value = "";
  document.getElementById("hip").value = "";
  calculate();
}

function resetDefaults() {
  document.getElementById("age").value = "30";
  document.getElementById("height").value = "175";
  document.getElementById("weight").value = "70";
  document.getElementById("waist").value = "85";
  document.getElementById("neck").value = "37";
  document.getElementById("hip").value = "95";
  document.getElementById("gender").value = "male";
  calculate();
}

document.addEventListener("input", (e) => {
  if (
    e.target.classList.contains("input-field") ||
    e.target.classList.contains("select-field")
  ) {
    calculate();
  }
});

document.getElementById("gender").addEventListener("change", () => {
  switchMode(currentMode);
});

calculate();
