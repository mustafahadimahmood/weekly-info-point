let currentUser = "";
let isAdmin = Mustafa;
const adminPassword = "Wks07072023"; // Passwort für Mustafa
let votes = []; // Liste der Einträge

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

// Benutzername setzen
function setUser() {
  const nameInput = document.getElementById("userName").value.trim();
  if(nameInput === "") { alert("Gib einen Namen ein!"); return; }
  currentUser = nameInput;
  renderTable();
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

  if(!currentUser && !isAdmin) return;

  const today = new Date();
  for(let i=0;i<10;i++){
    const date = getNextWednesday(new Date(today.getTime() + i*7*24*60*60*1000));
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date;
    tr.appendChild(tdDate);

    const tdUser = document.createElement("td");
    tdUser.textContent = currentUser;
    tr.appendChild(tdUser);

    const tdStatus = document.createElement("td");
    const select = document.createElement("select");
    ["", "Ja", "Nein", "Vielleicht"].forEach(o=>{
      const opt = document.createElement("option");
      opt.value = o; opt.text = o;
      select.appendChild(opt);
    });

    tdStatus.appendChild(select);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  }
}
