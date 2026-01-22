const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const userPassword = "Wks07072023"; // Einmaliges Passwort für alle Teilnehmer
const adminPassword = "Wks07072023"; // Admin Passwort (kann gleich sein)
let isAdmin = false;
let currentUser = "";

// Teilnehmer Login
function loginUser() {
  const nameInput = document.getElementById("userName").value.trim();
  const passInput = document.getElementById("userPass").value;

  // Name prüfen (case insensitive, mit Anpassung)
  const nameNorm = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

  if(!participants.includes(nameNorm)){
    document.getElementById("userMsg").textContent = "Name nicht in der Liste!";
    return;
  }
  if(passInput !== userPassword){
    document.getElementById("userMsg").textContent = "Falsches Passwort!";
    return;
  }

  // Login erfolgreich
  isAdmin = false;
  currentUser = nameNorm;
  document.getElementById("userMsg").textContent = "";
  document.getElementById("user-login").style.display = "none";
  document.getElementById("admin-login").style.display = "none";
  renderTable();
}

// Admin Login
function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if(pass === adminPassword){
    isAdmin = true;
    currentUser = "Mustafa";
    document.getElementById("adminMsg").textContent = "";
    document.getElementById("user-login").style.display = "none";
    document.getElementById("admin-login").style.display = "none";
    renderTable();
  } else {
    document.getElementById("adminMsg").textContent = "Falsches Passwort!";
  }
}

// Nächster Mittwoch berechnen
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed;
}

// Tabelle rendern (52 Wochen)
function renderTable() {
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  if(!currentUser) return;

  const today = new Date();
  let date = getNextWednesday(today);

  for(let i = 0; i < 52; i++) {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date.toISOString().split("T")[0];
    tr.appendChild(tdDate);

    participants.forEach(p => {
      const td = document.createElement("td");
      const select = document.createElement("select");
      ["", "Ja", "Nein", "Vielleicht"].forEach(o => {
        const opt = document.createElement("option");
        opt.value = o;
        opt.text = o;
        select.appendChild(opt);
      });

      // Nur Admin kann alle bearbeiten, sonst nur eigene Spalte
      if(!isAdmin && p !== currentUser){
        select.disabled = true;
      }

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    date.setDate(date.getDate() + 7);
  }


