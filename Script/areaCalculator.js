let currentShape = "square";

function selectShape(shape) {
  currentShape = shape;
  document
    .querySelectorAll(".shape-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  const inputSection = document.getElementById("inputSection");
  inputSection.innerHTML = '<div class="section-label">Dimensions</div>';

  const shapeInputs = {
    square: ["Side length"],
    rectangle: ["Length", "Width"],
    circle: ["Radius"],
    triangle: ["Base", "Height"],
    trapezoid: ["Base 1", "Base 2", "Height"],
    ellipse: ["Major axis (a)", "Minor axis (b)"],
  };

  shapeInputs[shape].forEach((placeholder, index) => {
    inputSection.innerHTML += `<input type="number" class="input-field" id="input${
      index + 1
    }" placeholder="${placeholder}" value="10" step="0.1">`;
  });

  addInputListeners();
  calculateArea();
}

function addInputListeners() {
  document
    .querySelectorAll(".input-field")
    .forEach((input) => input.addEventListener("input", calculateArea));
}

function calculateArea() {
  const input1 = parseFloat(document.getElementById("input1")?.value) || 0;
  const input2 = parseFloat(document.getElementById("input2")?.value) || 0;
  const input3 = parseFloat(document.getElementById("input3")?.value) || 0;

  let area = 0;

  switch (currentShape) {
    case "square":
      area = input1 ** 2;
      break;
    case "rectangle":
      area = input1 * input2;
      break;
    case "circle":
      area = Math.PI * input1 ** 2;
      break;
    case "triangle":
      area = (input1 * input2) / 2;
      break;
    case "trapezoid":
      area = ((input1 + input2) / 2) * input3;
      break;
    case "ellipse":
      area = Math.PI * input1 * input2;
      break;
  }

  document.getElementById("areaValue").textContent = area.toFixed(2);
}

function clearAll() {
  document
    .querySelectorAll(".input-field")
    .forEach((input) => (input.value = ""));
  calculateArea();
}

function resetShape() {
  selectShape("square");
  document
    .querySelectorAll(".shape-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(".shape-btn").classList.add("active");
}

// Initial setup
addInputListeners();
calculateArea();
