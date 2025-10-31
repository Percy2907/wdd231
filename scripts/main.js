const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

if (menuButton && navMenu) {

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", (e) => {
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

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students become more efficient programmers by learning to write, call, debug, and test functions.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces the concept of classes, objects, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students learn to create dynamic websites using JavaScript for responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students focus on UX, accessibility, and API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const container = document.querySelector("#course-container");
const totalCreditsEl = document.querySelector("#total-credits");

function displayCourses(filter = "All") {
  container.innerHTML = "";
  let filtered = courses.filter(course => filter === "All" || course.subject === filter);

  filtered.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");

    div.innerHTML = `
      <strong>${course.subject} ${course.number}:</strong> ${course.title}<br>
      <em>${course.credits} credits</em><br>
      <small>${course.technology.join(", ")}</small>
    `;
    container.appendChild(div);
  });

  const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `The total credits for courses listed above is ${totalCredits}.`;
}

document.querySelector("#all").addEventListener("click", () => displayCourses("All"));
document.querySelector("#cse").addEventListener("click", () => displayCourses("CSE"));
document.querySelector("#wdd").addEventListener("click", () => displayCourses("WDD"));

displayCourses();

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;