const participants = ["Christa","Ruben","Mustafa","Theo","Cordula","Neli"];
const adminName = "Mustafa";
let currentUser = "";

// Login Funktion
function loginUser() {
  const input = document.getElementById("userName").value.trim();
  const name = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  if (!participants.includes(name)) {
    document.getElementById("msg").textContent = "Name nicht in der Liste!";
    return;
  }

  currentUser = name;
  document.getElementById("msg").textContent = "";
  document.getElementById("login").style.display = "none";
  document.getElementById("voteTable").style.display = "table";

  renderTable();
}

// Nächster Mittwoch
function getNextWednesday(date = new Date()) {
  const nextWed = new Date(date);
  nextWed.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  return nextWed;
}

// Tabelle rendern & Daten aus Firebase laden
function renderTable() {
  const tbody = document.querySelector("#voteTable tbody");
  tbody.innerHTML = "";

  let date = getNextWednesday();

  for (let i = 0; i < 52; i++) {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    const dateStr = date.toISOString().split("T")[0];
    tdDate.textContent = dateStr;
    tr.appendChild(tdDate);

    participants.forEach(p => {
      const td = document.createElement("td");
      const select = document.createElement("select");
      ["", "Ja", "Nein", "Vielleicht"].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        select.appendChild(opt);
      });

      // Nur Admin darf alle Spalten bearbeiten
      if(currentUser !== adminName && p !== currentUser){
        select.disabled = true;
      }

      // Änderung speichern
      select.addEventListener("change", () => {
        firebase.database().ref(`votes/${dateStr}/${p}`).set(select.value);
      });

      // Aktuellen Wert aus Firebase laden
      firebase.database().ref(`votes/${dateStr}/${p}`).once("value").then(snapshot => {
        if(snapshot.exists()){
          select.value = snapshot.val();
        }
      });

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    date.setDate(date.getDate() + 7);
  }

  document.getElementById("voteTable").style.display = "table";
}
