const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

if (menuButton && navMenu) {
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    menuButton.textContent = isOpen ? "X" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.classList.contains("open")) return;
    if (!navMenu.contains(e.target) && e.target !== menuButton) {
      navMenu.classList.remove("open");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}



// --------------------
// Course Data
// --------------------
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming...',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Introduction to the World Wide Web and careers...',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Learn to write, call, debug, and test functions.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Classes, objects, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Dynamic websites using JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'UX, accessibility, and API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];



// --------------------
// Modal Elements
// --------------------
const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("closeModal");

closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
  const box = document.getElementById("modalContent");
  if (!box.contains(e.target)) {
    modalOverlay.style.display = "none";
  }
});



// --------------------
// Display Courses
// --------------------
const container = document.querySelector("#course-container");
const totalCreditsEl = document.querySelector("#total-credits");

function displayCourses(filter = "All") {
  container.innerHTML = "";

  let filtered = courses.filter(
    course => filter === "All" || course.subject === filter
  );

  filtered.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    div.style.cursor = "pointer";  

    div.classList.add(course.completed ? "completed" : "not-completed");

    div.innerHTML = `
      <strong>${course.subject} ${course.number} – ${course.title}</strong>
    `;

    div.addEventListener("click", () => showModal(course));

    container.appendChild(div);
  });

  const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `The total credits for courses listed above is ${totalCredits}.`;
}



// --------------------
// Show Modal
// --------------------
function showModal(course) {
  document.getElementById("modal-title").textContent =
    `${course.subject} ${course.number} – ${course.title}`;

  document.getElementById("modal-credits").textContent = course.credits;
  document.getElementById("modal-certificate").textContent = course.certificate;
  document.getElementById("modal-description").textContent = course.description;
  document.getElementById("modal-tech").textContent = course.technology.join(", ");

  modalOverlay.style.display = "flex"; 
}



// --------------------
// Filter Buttons
// --------------------
document.querySelector("#all").addEventListener("click", () => displayCourses("All"));
document.querySelector("#cse").addEventListener("click", () => displayCourses("CSE"));
document.querySelector("#wdd").addEventListener("click", () => displayCourses("WDD"));

displayCourses();



// --------------------
// Footer
// --------------------
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;