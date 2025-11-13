console.log('sections.mjs cargado');

export function setSectionSelection(sections) {
  console.log('setSectionSelection ejecutado con sections =', sections);
  const sectionSelect = document.querySelector("#sectionNumber");
  if (!sectionSelect) {
    console.error('#sectionNumber no encontrado en el DOM');
    return;
  }

  sectionSelect.querySelectorAll('option:not([disabled])')?.forEach(opt => opt.remove());

  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = section.sectionNumber;
    sectionSelect.appendChild(option);
  });
}
