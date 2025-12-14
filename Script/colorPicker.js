function hsvToRgb(h,s,v){
  s/=100;v/=100;
  let c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c,r=0,g=0,b=0;
  if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}
  return {r:Math.round((r+m)*255), g:Math.round((g+m)*255), b:Math.round((b+m)*255)};
}

function rgbToHsl(r,g,b){
  r/=255;g/=255;b/=255;
  let max=Math.max(r,g,b),min=Math.min(r,g,b),h=0,s=0,l=(max+min)/2;
  if(max!=min){let d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;}h=Math.round(h*60);s=Math.round(s*100);l=Math.round(l*100);}else{h=0;s=0;l=Math.round(l*100);}
  return {h,s,l};
}

function rgbToCmyk(r,g,b){
  let c=1-r/255,m=1-g/255,y=1-b/255,k=Math.min(c,m,y);
  if(k===1)return {c:0,m:0,y:0,k:100};
  c=(c-k)/(1-k)*100;m=(m-k)/(1-k)*100;y=(y-k)/(1-k)*100;k*=100;
  return {c:Math.round(c),m:Math.round(m),y:Math.round(y),k:Math.round(k)};
}

function componentToHex(c){let hex=c.toString(16);return hex.length==1?"0"+hex:hex;}
function rgbToHex(r,g,b){return "#"+componentToHex(r)+componentToHex(g)+componentToHex(b);}
let currentBgColor="#FF0000";
function updateDisplay(r,g,b){
  let hex=rgbToHex(r,g,b);
  let hsl=rgbToHsl(r,g,b);
  let cmyk=rgbToCmyk(r,g,b);
  document.getElementById('colorBox').textContent=hex;
  document.getElementById('colorBox').style.background=hex;
  document.getElementById('hexBox').textContent=hex;
  document.getElementById('rgbBox').textContent=`rgb(${r},${g},${b})`;
  document.getElementById('rgbaBox').textContent=`rgba(${r},${g},${b},1)`;
  document.getElementById('hslBox').textContent=`hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`;
  document.getElementById('hslaBox').textContent=`hsla(${hsl.h},${hsl.s}%,${hsl.l}%,1)`;
  document.getElementById('cmykBox').textContent=`cmyk(${cmyk.c}%,${cmyk.m}%,${cmyk.y}%,${cmyk.k}%)`;
  currentBgColor=hex;
}

function hsvChanged(){
  let h=parseInt(document.getElementById('hue').value);
  let s=parseInt(document.getElementById('saturation').value);
  let v=parseInt(document.getElementById('value').value);
  let {r,g,b}=hsvToRgb(h,s,v);
  updateDisplay(r,g,b);
  document.getElementById('colorInput').value=rgbToHex(r,g,b);
}

document.getElementById('hue').addEventListener('input',hsvChanged);
document.getElementById('saturation').addEventListener('input',hsvChanged);
document.getElementById('value').addEventListener('input',hsvChanged);

// Copy function
document.querySelectorAll('.copy-box').forEach(box=>{
  box.addEventListener('click',()=>{
    const originalText = box.textContent;
    navigator.clipboard.writeText(originalText);
    box.textContent = 'Copied!';
    box.style.background = currentBgColor;
    setTimeout(()=>{
      box.textContent = originalText;
      box.style.background = 'transparent';
    }, 2000); // 2 seconds
  });
});

document.getElementById('colorInput').addEventListener('input',()=>{
  let val=document.getElementById('colorInput').value.trim();
  // HEX
  let hexMatch=val.match(/^#?([0-9a-fA-F]{6})$/);
  if(hexMatch){
    val="#"+hexMatch[1];
    let r=parseInt(hexMatch[1].slice(0,2),16);
    let g=parseInt(hexMatch[1].slice(2,4),16);
    let b=parseInt(hexMatch[1].slice(4,6),16);
    updateDisplay(r,g,b);
    let hsl=rgbToHsl(r,g,b);
    let max=Math.max(r,g,b),min=Math.min(r,g,b),v=max/255*100,sat=(max-min)/max*100||0;
    document.getElementById('hue').value=hsl.h;
    document.getElementById('saturation').value=Math.round(sat);
    document.getElementById('value').value=Math.round(v);
  }
  // RGB
  let rgbMatch=val.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i);
  if(rgbMatch){
    let r=parseInt(rgbMatch[1]),g=parseInt(rgbMatch[2]),b=parseInt(rgbMatch[3]);
    updateDisplay(r,g,b);
    let hsl=rgbToHsl(r,g,b);
    let max=Math.max(r,g,b),min=Math.min(r,g,b),v=max/255*100,sat=(max-min)/max*100||0;
    document.getElementById('hue').value=hsl.h;
    document.getElementById('saturation').value=Math.round(sat);
    document.getElementById('value').value=Math.round(v);
  }
  // HSL
  let hslMatch=val.match(/hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/i);
  if(hslMatch){
    let h=parseInt(hslMatch[1]),s=parseInt(hslMatch[2]),l=parseInt(hslMatch[3]);
    // convert HSL to RGB
    s/=100;l/=100;
    let c=(1-Math.abs(2*l-1))*s;
    let x=c*(1-Math.abs((h/60)%2-1));
    let m=l-c/2;
    let r1=0,g1=0,b1=0;
    if(h<60){r1=c;g1=x;}else if(h<120){r1=x;g1=c;}else if(h<180){g1=c;b1=x;}else if(h<240){g1=x;b1=c;}else if(h<300){r1=x;b1=c;}else{r1=c;b1=x;}
    let r=Math.round((r1+m)*255),g=Math.round((g1+m)*255),b=Math.round((b1+m)*255);
    updateDisplay(r,g,b);
    let max=Math.max(r,g,b),min=Math.min(r,g,b),v=max/255*100,satVal=(max-min)/max*100||0;
    document.getElementById('hue').value=h;
    document.getElementById('saturation').value=Math.round(satVal);
    document.getElementById('value').value=Math.round(v);
  }
});

// Clear function
function clearAll(){
  document.getElementById('colorInput').value='';
  document.getElementById('hue').value=0;
  document.getElementById('saturation').value=0;
  document.getElementById('value').value=0;

  // result boxes
  document.getElementById('colorBox').textContent='';
  document.getElementById('colorBox').style.background='transparent';
  document.getElementById('hexBox').textContent='';
  document.getElementById('rgbBox').textContent='';
  document.getElementById('rgbaBox').textContent='';
  document.getElementById('hslBox').textContent='';
  document.getElementById('hslaBox').textContent='';
  document.getElementById('cmykBox').textContent='';
}

function resetDefaults(){
  document.getElementById('colorInput').value='#ff0000';
  document.getElementById('hue').value=0;
  document.getElementById('saturation').value=100;
  document.getElementById('value').value=100;
  hsvChanged();
}

hsvChanged();