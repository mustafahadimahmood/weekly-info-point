const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const adminName = "Mustafa";
const adminPassword = "Wks07072023"; // Mustafa Passwort
let isAdmin = false;

// Login als Admin
function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if(pass === adminPassword){
    isAdmin = true;
    document.getElementById("loginMsg").textContent = "Admin eingeloggt!";
    renderTable();
  } else {
    document.getElementById("loginMsg").textContent = "Falsches Passwort!";
  }
}

// Nächster Mittwoch
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed.toISOString().split('T')[0];
}

// Render Tabelle
function renderTable(){
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  const today = new Date();
  for(let i=0;i<10;i++){ // 10 Wochen anzeigen
    const date = getNextWednesday(new Date(today.getTime() + i*7*24*60*60*1000));
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date;
    tr.appendChild(tdDate);

    participants.forEach(p => {
      const td = document.createElement("td");
      const select = document.createElement("select");

      ["", "Ja", "Nein", "Vielleicht"].forEach(o=>{
        const opt = document.createElement("option");
        opt.value = o;
        opt.text = o;
        select.appendChild(opt);
      });

      // Wenn kein Admin und nicht eigene Spalte → deaktivieren
      const username = prompt("Gib deinen Namen ein:"); // einfacher Name-Check
      if(!isAdmin && p !== username){
        select.disabled = true;
      }

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
}

// Tabelle initial rendern
renderTable();
