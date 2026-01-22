// Teilnehmerliste
const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const adminName = "Mustafa";
const adminPassword = "admin123"; // Passwort für Mustafa

let isAdmin = false;
let currentUser = "";

// Admin Login
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

// Benutzer setzen
function setUser(name) {
  if(participants.includes(name)){
    currentUser = name;
    renderTable();
  } else {
    alert("Name nicht in der Liste!");
  }
}

// Nächster Mittwoch
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed.toISOString().split('T')[0];
}

// Tabelle rendern
function renderTable(){
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  if(!currentUser && !isAdmin) return; // Benutzer nicht gesetzt

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
        opt.value = o; opt.text = o;
        select.appendChild(opt);
      });

      // Berechtigungen: nur eigene Spalte bearbeiten, außer Admin
      if(!isAdmin && p !== currentUser){
        select.disabled = true;
      }

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
}

// Benutzername setzen über Prompt beim Laden
window.onload = function() {
  let name = prompt("Gib deinen Namen ein:");
  setUser(name);
}
