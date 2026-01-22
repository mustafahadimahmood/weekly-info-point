const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const adminPassword = "Wks07072023"; // Passwort für Mustafa
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
function setUser() {
  const nameInput = document.getElementById("userName").value.trim();
  if(participants.includes(nameInput)){
    currentUser = nameInput;
    renderTable();
  } else {
    alert("Name nicht in der Liste!");
  }
}

// Nächster Mittwoch
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed;
}

// Tabelle rendern (52 Wochen)
function renderTable(){
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  if(!currentUser && !isAdmin) return;

  const today = new Date();
  let date = getNextWednesday(today);

  for(let i=0;i<52;i++){ // 52 Wochen
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date.toISOString().split('T')[0];
    tr.appendChild(tdDate);

    participants.forEach(p => {
      const td = document.createElement("td");
      const select = document.createElement("select");
      ["", "Ja", "Nein", "Vielleicht"].forEach(o=>{
        const opt = document.createElement("option");
        opt.value = o; opt.text = o;
        select.appendChild(opt);
      });

      if(!isAdmin && p !== currentUser){
        select.disabled = true; // nur eigene Spalte aktiv
      }

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);

    // Nächster Mittwoch
    date.setDate(date.getDate() + 7);
  }
}

// Beim Laden Nutzer prompt
window.onload = function() {
  let name = prompt("Gib deinen Namen ein:");
  setUser(name);
}
