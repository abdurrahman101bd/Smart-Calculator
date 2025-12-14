const inputsWrap = document.getElementById("inputsWrap");
const qrBox = document.getElementById("qrBox");
const fgColor = document.getElementById("fgColor");
const errorLevel = document.getElementById("errorLevel");

let lastCanvas = null;

/* ✅ Collect all inputs → ONE QR */
function getCombinedText(){
  let text = [];
  document.querySelectorAll(".qr-input").forEach(inp=>{
    const val = inp.value.trim();
    if(val) text.push(val);
  });
  return text.join("\n");
}

/* ✅ Generate SINGLE QR */
function generateQR(){
  const finalText = getCombinedText();
  qrBox.innerHTML="";
  lastCanvas = null;

  if(!finalText) return;

  QRCode.toCanvas(finalText,{
    width:220,
    errorCorrectionLevel:errorLevel.value,
    color:{
      dark: fgColor.value,
      light:"#ffffff"
    }
  },(err,canvas)=>{
    if(!err){
      qrBox.appendChild(canvas);
      lastCanvas = canvas;
    }
  });
}

/* Add input */
addInputBtn.onclick=()=>{
  const inp = document.createElement("input");
  inp.className="qr-input";
  inp.placeholder="Enter text / URL";
  inp.addEventListener("input", generateQR);
  inputsWrap.appendChild(inp);
};

/* Events */
fgColor.addEventListener("input", generateQR);
errorLevel.addEventListener("change", generateQR);
inputsWrap.addEventListener("input", generateQR);
regenBtn.addEventListener("click", generateQR);

/* Clear */
clearBtn.onclick=()=>{
  inputsWrap.innerHTML="";
  qrBox.innerHTML="";
  lastCanvas = null;
  addInputBtn.click();
};

/* Reset */
resetBtn.onclick=()=>{
  inputsWrap.innerHTML="";
  addInputBtn.click();
  document.querySelector(".qr-input").value="https://example.com";
  generateQR();
};

/* Download QR */
qrBox.onclick=()=>{
  if(!lastCanvas) return;
  const a=document.createElement("a");
  a.href=lastCanvas.toDataURL();
  a.download="qr-code.png";
  a.click();
};

/* Default */
addInputBtn.click();