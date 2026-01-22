let user = "";

function nextWednesday(d=new Date()){
  d.setDate(d.getDate()+((3-d.getDay()+7)%7||7));
  return d;
}

function start(){
  user = document.getElementById("nameInput").value.trim();
  if(!user) return alert("Name eingeben!");

  document.getElementById("app").style.display="block";
  loadTable();
}

function loadTable(){
  const tbody=document.querySelector("tbody");
  tbody.innerHTML="";
  let d=nextWednesday();

  for(let i=0;i<52;i++){
    const date=d.toISOString().split("T")[0];
    const tr=document.createElement("tr");

    const td1=document.createElement("td");
    td1.textContent=date;

    const td2=document.createElement("td");
    const sel=document.createElement("select");

    ["","Ja","Nein","Vielleicht"].forEach(v=>{
      const o=document.createElement("option");
      o.value=o.text=v;
      sel.appendChild(o);
    });

    const saved=localStorage.getItem(user+"_"+date);
    if(saved) sel.value=saved;

    sel.onchange=()=>localStorage.setItem(user+"_"+date, sel.value);

    td2.appendChild(sel);
    tr.append(td1,td2);
    tbody.appendChild(tr);

    d.setDate(d.getDate()+7);
  }
}

function save(){
  document.getElementById("msg").textContent="Gespeichert ✔";
}
