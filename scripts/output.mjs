console.log('output.mjs cargado');

export function setTitle(course) {
  const elName = document.querySelector("#courseName");
  const elCode = document.querySelector("#courseCode");
  if (!elName || !elCode) {
    console.error('#courseName o #courseCode no encontrados');
    return;
  }
  elName.textContent = course.name;
  elCode.textContent = course.code;
}

export function renderSections(sections) {
  const tbody = document.querySelector("#sections");
  if (!tbody) {
    console.error('#sections (tbody) no encontrado');
    return;
  }

  const html = sections
    .map(
      (section) => `
      <tr>
        <td>${section.sectionNumber}</td>
        <td>${section.enrolled}</td>
        <td>${section.instructor}</td>
      </tr>`
    )
    .join("");
  tbody.innerHTML = html;
}