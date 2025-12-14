let currentMode = 'difference';
const today = new Date();
const fromDateInput = document.getElementById('fromDateInput');
const toDateInput = document.getElementById('toDateInput');
const startDateInput = document.getElementById('startDateInput');

function createDateDropdowns(container, defaultDate=today){
  container.innerHTML='';
  const daySelect=document.createElement('select');
  const monthSelect=document.createElement('select');
  const yearSelect=document.createElement('select');
  for(let d=1;d<=31;d++) daySelect.add(new Option(d,d));
  for(let m=1;m<=12;m++) monthSelect.add(new Option(m,m));
  for(let y=today.getFullYear();y>=1900;y--) yearSelect.add(new Option(y,y));
  daySelect.value=defaultDate.getDate();
  monthSelect.value=defaultDate.getMonth()+1;
  yearSelect.value=defaultDate.getFullYear();
  container.appendChild(daySelect);
  container.appendChild(monthSelect);
  container.appendChild(yearSelect);
  return {daySelect,monthSelect,yearSelect};
}

const fromDropdowns=createDateDropdowns(fromDateInput);
const toDropdowns=createDateDropdowns(toDateInput);
const startDropdowns=createDateDropdowns(startDateInput);

function getDateFromDropdowns({daySelect,monthSelect,yearSelect}){
  return new Date(yearSelect.value,monthSelect.value-1,daySelect.value);
}

function switchMode(mode){
  currentMode=mode;
  document.querySelectorAll('.mode-tab').forEach(tab=>tab.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('differenceMode').style.display=mode==='difference'?'block':'none';
  document.getElementById('addMode').style.display=mode==='add'?'block':'none';
  calculate();
}

function calculate(){
  if(currentMode==='difference') calculateDifference();
  else calculateAddSubtract();
}

function calculateDifference(){
  const from=getDateFromDropdowns(fromDropdowns);
  const to=getDateFromDropdowns(toDropdowns);
  if(!from||!to) return;
  const diffTime=Math.abs(to-from);
  const diffDays=Math.floor(diffTime/(1000*60*60*24));
  const diffWeeks=Math.floor(diffDays/7);
  const diffMonths=Math.floor(diffDays/30.44);
  const diffYears=Math.floor(diffDays/365.25);
  document.getElementById('differenceResult').innerHTML=`
    ${diffDays.toLocaleString()} days
    <div class="result-label">${diffWeeks} weeks | ${diffMonths} months | ${diffYears} years</div>
  `;
}

function calculateAddSubtract(){
  const start=getDateFromDropdowns(startDropdowns);
  const amount=parseInt(document.getElementById('amount').value)||0;
  const unit=document.getElementById('unit').value;
  const result=new Date(start);
  if(unit==='days') result.setDate(result.getDate()+amount);
  else if(unit==='weeks') result.setDate(result.getDate()+amount*7);
  else if(unit==='months') result.setMonth(result.getMonth()+amount);
  else if(unit==='years') result.setFullYear(result.getFullYear()+amount);
  document.getElementById('addResult').textContent=result.toLocaleDateString('en-US',{
    weekday:'long',year:'numeric',month:'long',day:'numeric'
  });
}

function clearAll(){
  [fromDropdowns,toDropdowns,startDropdowns].forEach(drop=>{
    drop.daySelect.value=today.getDate();
    drop.monthSelect.value=today.getMonth()+1;
    drop.yearSelect.value=today.getFullYear();
  });
  document.getElementById('differenceResult').innerHTML='0 days<div class="result-label"></div>';
  document.getElementById('addResult').textContent='-';
}

function setToday(){
  [fromDropdowns,toDropdowns,startDropdowns].forEach(drop=>{
    drop.daySelect.value=today.getDate();
    drop.monthSelect.value=today.getMonth()+1;
    drop.yearSelect.value=today.getFullYear();
  });
  calculate();
}