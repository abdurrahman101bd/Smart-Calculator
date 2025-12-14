const grid = document.getElementById("paletteGrid");
const countInput = document.getElementById("countInput");

function randomColor(){
  return "#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");
}

function generatePalette(){
  grid.innerHTML="";
  let count = parseInt(countInput.value) || 5;
  for(let i=0;i<count;i++){
    let color = randomColor();
    let box = document.createElement("div");
    box.className="palette-box";
    box.style.background=color;
    box.textContent=color.toUpperCase();

    box.onclick = ()=>{
      navigator.clipboard.writeText(color);
      box.textContent="Copied";
      setTimeout(()=>box.textContent=color.toUpperCase(),900);
    };

    grid.appendChild(box);
  }
}

// Buttons
document.getElementById("regenBtn").onclick = generatePalette;

document.getElementById("clearBtn").onclick = ()=>{
  countInput.value="";
  grid.innerHTML="";
};


// Default
generatePalette();