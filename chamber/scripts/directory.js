const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Footer info
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}`;

// Toggle Grid/List
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const membersContainer = document.querySelector("#members");

gridBtn.addEventListener("click", () => {
  membersContainer.classList.replace("list", "grid");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.replace("grid", "list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    membersContainer.appendChild(card);
  });
}

loadMembers();