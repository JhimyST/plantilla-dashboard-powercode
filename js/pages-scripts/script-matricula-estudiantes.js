$(document).ready(function () {

  let btnApplyFilters = $("#apply-filters");
  let listasCursos = $("#columnCursos .lista-curso-item ul");
  let areas = $("#formAreaSelect");
  let docentesOfCourses = $("#collapseDocentes1");
  let listaSemestres = $("#lista-semestres");

  console.log(listasCursos);
  /* console.log(listasCursos); */

  /* Validación de Existencia de Asignación de docentes */
  listasCursos.each(function (index, listaCurso) {
    let cursosConDocentes = 0;
    let cursosSinDocentes = 0;
    let containerListaCursos = $(this).find('li div.collapse').parents("div.lista-curso-item");

    /* Recorre cursos para añadir o quitar el botón de mostrar docentes */
    $(this).find('li').each(function (index, curso) {
      let contentCollapseDocentes = $(this).find("div.collapse"); // Obtener el div que contiene el contenido del collapse
      let IdCollapseDocentes = contentCollapseDocentes.attr('id'); // Obtener el id del div que contiene el contenido del collapse

      console.log(IdCollapseDocentes);

      if (contentCollapseDocentes.children('div').text() != 0) {
        contentCollapseDocentes.parentsUntil(".list-group").find('.curso-btn-opciones').prepend(`
                          <div class="d-flex">
                              <button type="button"
                                class="btn btn-link link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                                data-bs-toggle="modal" data-bs-target="#modalMatricEstud">
                                <i class="bi bi-mortarboard fs-3 fw-bold"></i>
                              </button>
                          </div>
            `
        );
        cursosConDocentes++;

      } else {
        contentCollapseDocentes.parentsUntil(".list-group").find('.curso-btn-opciones div button[data-bs-toggle="collapse"]').remove();
        cursosSinDocentes++;
      }
    })


  });/* Recorre cada ul que guarda los cursos para cada semestre */

});
