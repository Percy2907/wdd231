// MENU TOGGLE
const menuBtn = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.style.display =
    navMenu.style.display === "flex" ? "none" : "flex";
});

// FOOTER YEAR & LAST MODIFIED
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;