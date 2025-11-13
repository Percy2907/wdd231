console.log('modules.mjs cargado (entry)');

import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

console.log('byuiCourse importado:', byuiCourse);

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM listo — inicializando UI');
  setTitle(byuiCourse);
  setSectionSelection(byuiCourse.sections);
  renderSections(byuiCourse.sections);

  document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections);
  });

  document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
  });
});