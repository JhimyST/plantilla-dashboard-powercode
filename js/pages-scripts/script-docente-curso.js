$(document).ready(function () {

  let btnApplyFilters = $("#apply-filters");
  let listasCursos = $("#columnCursos .lista-curso-item ul");
  let areas = $("#formAreaSelect");
  let docentesOfCourses = $("#collapseDocentes1");

  /* console.log(listasCursos); */

  /* Inicializacion de select 2 */
  $('#docente-select').select2({
    placeholder: "Buscar",
    dropdownParent: '#asignarDocente',
  });

  /* Diseño de semestres -> cursos */
  // Manejando el active para cada opcion de la lista de cursos
  listasCursos.find('li').click(function (e) {
    e.preventDefault();
    let idElement = $(this).attr("id");

    listasCursos.find('li').each(function () {
      if (idElement == $(this).attr("id")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });

  /* Validación de selects */
  areas.on('change', function () {
    let varOption = areas.val();
  });

  /* Validación de Existencia de Asignación de docentes */

  listasCursos.each(function(listaCurso, index) {
    let cursosConDocentes = 0;
    let cursosSinDocentes = 0;
    console.log($(index));

    $(this).find('li').each(function (curso, index) {
      console.log($(this));
      let contentCollapseDocentes = $(this).find("div.collapse"); // Obtener el div que contiene el contenido del collapse
      let IdCollapseDocentes = contentCollapseDocentes.attr('id'); // Obtener el id del div que contiene el contenido del collapse
  
      let containerListaCursos = contentCollapseDocentes.parents("div.lista-curso-item");
      let listaSemestres = $("#lista-semestres");
  
      if (contentCollapseDocentes.children('div').text() != 0) {
        console.log('si hay contenido');
        contentCollapseDocentes.parentsUntil(".list-group").find('.curso-btn-opciones').append(`
            <div class="d-flex">
              <button type="button"
                class="btn btn-link link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                data-bs-toggle="collapse" href="#${IdCollapseDocentes}" role="button" aria-expanded="false"
                aria-controls="${IdCollapseDocentes}">
                <i class="bi bi-eye-fill"></i>
                Ver docentes
              </button>
            </div>`
        );
        cursosConDocentes++;        
        /* listaSemestres.find('a.list-group-item').each(function () {
          
          if ($(this).attr('href').substring(1) == containerListaCursos.attr('id')) {
            $(this).append('<i class="bi bi-check2-circle"></i>');
          }
        }); */
  
  
      } else {
        console.log('no hay contenido');
        contentCollapseDocentes.parentsUntil(".list-group").find('.curso-btn-opciones div button[data-bs-toggle="collapse"]').remove();
        cursosSinDocentes++;
      }
    })

    console.log("cursos con docentes: "+cursosConDocentes);
    console.log("cursos sin docentes: "+cursosSinDocentes);
  });


});
