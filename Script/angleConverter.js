function calculate() {
  const value = parseFloat(document.getElementById("inputValue").value) || 0;
  const unit = document.getElementById("inputUnit").value;

  let degree = 0;

  // Convert to Degree first
  switch (unit) {
    case "degree":
      degree = value;
      break;
    case "radian":
      degree = value * (180 / Math.PI);
      break;
    case "gradian":
      degree = value * 0.9;
      break;
  }

  // Convert from Degree to all units
  document.getElementById("degreeResult").textContent = degree.toFixed(4);
  document.getElementById("radianResult").textContent = (
    degree *
    (Math.PI / 180)
  ).toFixed(6);
  document.getElementById("gradianResult").textContent = (degree / 0.9).toFixed(
    4
  );
}

function clearAll() {
  document.getElementById("inputValue").value = "";
  calculate();
}

function resetDefaults() {
  document.getElementById("inputValue").value = "180";
  document.getElementById("inputUnit").value = "degree";
  calculate();
}

document.getElementById("inputValue").addEventListener("input", calculate);
document.getElementById("inputUnit").addEventListener("change", calculate);

calculate();
