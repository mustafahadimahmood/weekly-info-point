const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const adminPassword = "Wks07072023"; // Admin-Passwort für Mustafa
let isAdmin = false;
let currentUser = ""; // leer, keine Anmeldung

// Admin Login bleibt, damit Mustafa sich einloggen kann
function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if(pass === adminPassword){
    isAdmin = true;
    currentUser = "Mustafa"; // Admin ist Mustafa
    document.getElementById("loginMsg").textContent = "Admin eingeloggt!";
    renderTable();
  } else {
    document.getElementById("loginMsg").textContent = "Falsches Passwort!";
  }
}

// Kein Benutzer setzen mehr – currentUser leer (keine Anmeldung)

// Nächster Mittwoch berechnen
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed;
}

// Tabelle rendern (52 Wochen)
function renderTable(){
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  // Wenn nicht Admin und kein aktueller User, setze currentUser leer (alle Spalten deaktiviert)
  // Alternativ kann man jeden Namen für demo anzeigen, hier deaktivieren wir alles
  if(!isAdmin && !currentUser) {
    // Wir setzen currentUser leer und alle Dropdowns deaktiviert
  }

  const today = new Date();
  let date = getNextWednesday(today);

  for(let i=0; i<52; i++){ // 52 Wochen
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date.toISOString().split('T')[0];
    tr.appendChild(tdDate);

    participants.forEach(p => {
      const td = document.createElement("td");
      const select = document.createElement("select");
      ["", "Ja", "Nein", "Vielleicht"].forEach(o => {
        const opt = document.createElement("option");
        opt.value = o; opt.text = o;
        select.appendChild(opt);
      });

      // Nur Admin (Mustafa) kann alles bearbeiten
      // Alle anderen Spalten sind deaktiviert (da kein User-Login)
      if(!isAdmin){
        select.disabled = true;
      }

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);

    // Nächster Mittwoch
    date.setDate(date.getDate() + 7);
  }
}

// Seite lädt und rendert direkt ohne Popup
window.onload = function() {
  // Kein prompt mehr, einfach Tabelle rendern
  renderTable();
}
