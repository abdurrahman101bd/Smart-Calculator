const romanMap = [
  {val:1000,sym:'M'}, {val:900,sym:'CM'}, {val:500,sym:'D'}, {val:400,sym:'CD'},
  {val:100,sym:'C'}, {val:90,sym:'XC'}, {val:50,sym:'L'}, {val:40,sym:'XL'},
  {val:10,sym:'X'}, {val:9,sym:'IX'}, {val:5,sym:'V'}, {val:4,sym:'IV'}, {val:1,sym:'I'}
];

function toRoman(num){
  let roman='';
  for(let i=0;i<romanMap.length;i++){
    while(num>=romanMap[i].val){ roman+=romanMap[i].sym; num-=romanMap[i].val;}
  }
  return roman;
}

function fromRoman(str){
  let i=0,num=0;
  for(let j=0;j<romanMap.length;j++){
    while(str.substr(i, romanMap[j].sym.length)===romanMap[j].sym){ num+=romanMap[j].val; i+=romanMap[j].sym.length; }
  }
  return num;
}

function convert(){
  const input = document.getElementById('inputField').value.trim().toUpperCase();
  const output = document.getElementById('outputDisplay');
  if(!input) { output.textContent="Please enter a value"; return; }
  if(/^\d+$/.test(input)){
    const num=parseInt(input);
    if(num<=0 || num>3999){ output.textContent="Enter number between 1-3999"; return; }
    output.textContent = toRoman(num);
  } else if(/^[IVXLCDM]+$/.test(input)){
    const num = fromRoman(input);
    if(num<=0 || num>3999){ output.textContent="Invalid Roman numeral"; return; }
    output.textContent = num;
  } else { output.textContent="Invalid input"; }
}

function copyResult(){
  const output = document.getElementById('outputDisplay').textContent;
  const copyBtn = document.querySelector('.copy-btn');

  navigator.clipboard.writeText(output).then(()=>{
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#48bb78";
    copyBtn.style.color = "white";

    setTimeout(()=>{
      copyBtn.textContent = originalText;
      copyBtn.style.background = "#e0e5ec";
      copyBtn.style.color = "#2d3748";
    }, 2000);
  });
}

function clearAll(){
  document.getElementById('inputField').value='';
  document.getElementById('outputDisplay').textContent='Result will appear here';
}

// Auto-convert on input
document.getElementById('inputField').addEventListener('input', convert);

// Initialize default conversion
convert();