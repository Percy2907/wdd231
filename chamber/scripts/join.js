// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Timestamp hidden field
document.getElementById("timestamp").value = new Date().toISOString();

// Modal functionality
const links = document.querySelectorAll(".info-link");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".close");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const modalId = link.parentElement.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

closes.forEach(close => {
  close.addEventListener("click", e => {
    e.target.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
});