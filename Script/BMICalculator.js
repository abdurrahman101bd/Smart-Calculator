function calculateBMI() {
  let height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const heightUnit = document.getElementById("heightUnit").value;
  const weightUnit = document.getElementById("weightUnit").value;

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    document.getElementById("bmiValue").textContent = "Error";
    document.getElementById("bmiCategory").textContent = "Enter valid values";
    document.getElementById("bmiCategory").className = "bmi-category";
    return;
  }

  if (heightUnit === "cm") {
    height = height / 100;
  } else if (heightUnit === "ft") {
    height = height * 0.3048;
  } else if (heightUnit === "in") {
    height = height * 0.0254;
  }

  let weightInKg = weight;
  if (weightUnit === "lbs") {
    weightInKg = weight * 0.453592;
  }

  const bmi = weightInKg / (height * height);
  document.getElementById("bmiValue").textContent = bmi.toFixed(1);

  const categoryElement = document.getElementById("bmiCategory");
  if (bmi < 18.5) {
    categoryElement.textContent = "Underweight";
    categoryElement.className = "bmi-category underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    categoryElement.textContent = "Normal Weight";
    categoryElement.className = "bmi-category normal";
  } else if (bmi >= 25 && bmi < 30) {
    categoryElement.textContent = "Overweight";
    categoryElement.className = "bmi-category overweight";
  } else {
    categoryElement.textContent = "Obese";
    categoryElement.className = "bmi-category obese";
  }
}

function clearAll() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("bmiValue").textContent = "0.0";
  document.getElementById("bmiCategory").textContent = "Enter your information";
  document.getElementById("bmiCategory").className = "bmi-category";
}

function toggleUnit() {
  const heightUnit = document.getElementById("heightUnit");
  const weightUnit = document.getElementById("weightUnit");

  if (heightUnit.value === "cm") {
    heightUnit.value = "ft";
  } else {
    heightUnit.value = "cm";
  }

  if (weightUnit.value === "kg") {
    weightUnit.value = "lbs";
  } else {
    weightUnit.value = "kg";
  }

  calculateBMI();
}

document.getElementById("height").addEventListener("input", calculateBMI);
document.getElementById("weight").addEventListener("input", calculateBMI);
document.getElementById("heightUnit").addEventListener("change", calculateBMI);
document.getElementById("weightUnit").addEventListener("change", calculateBMI);

calculateBMI();
