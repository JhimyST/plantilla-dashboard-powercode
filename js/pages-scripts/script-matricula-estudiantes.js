$(document).ready(function () {

  let btnApplyFilters = $("#apply-filters");
  let listasCursos = $("#columnCursos .lista-curso-item ul");
  let areas = $("#formAreaSelect");
  let docentesOfCourses = $("#collapseDocentes1");
  let listaSemestres = $("#lista-semestres");
  let leftSelectAlumnos = $("#leftSelectAlumnos");

  //Validación de Existencia de Asignación de docentes
  listasCursos.each(function (index, listaCurso) {
    let cursosConDocentes = 0;
    let cursosSinDocentes = 0;
    let containerListaCursos = $(this).find('li div.collapse').parents("div.lista-curso-item");

    //Recorre cursos para añadir o quitar el botón de mostrar docentes
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

  });//Recorre cada ul que guarda los cursos para cada semestre

  //Pasar seleccion de un lado a otro

  // Capture el select de frutas disponibles, el botón "Agregar", el select de frutas seleccionadas y el cuadro de búsqueda

  const availableAlumnos = document.getElementById('leftSelectAlumnos');

  const addAlumnosButton = document.getElementById('btnMoveRight');

  const selectedAlumnos = document.getElementById('rightSelectAlumnos');

  const AlumnoLeftSearch = document.getElementById('alumnos-left-search');
  const AlumnoRightSearch = document.getElementById('alumnos-right-search');


  // Escucha el evento input del cuadro de búsqueda para filtrar las opciones
  buscarAlumno(AlumnoLeftSearch, availableAlumnos);
  buscarAlumno(AlumnoRightSearch, selectedAlumnos);


  function buscarAlumno(iptBuscar, selectGroup){
    iptBuscar.addEventListener('input', function (event) {
  
      const searchTerm = event.target.value.toLowerCase();
  
      const options = selectGroup.querySelectorAll('option');
  
      // Oculta las opciones que no coinciden con el término de búsqueda
  
      for (let i = 0; i < options.length; i++) {
  
        const option = options[i];
  
        const optionLabel = option.text.toLowerCase();
  
        if (optionLabel.includes(searchTerm)) {
  
          option.style.display = '';
  
        } else {
  
          option.style.display = 'none';
  
        }
  
      }
  
    });

  }



  // Escucha el evento click del botón "Agregar"

  addAlumnosButton.addEventListener('click', function () {

    // Obtiene todas las opciones seleccionadas en el select de frutas disponibles

    const selectedOptions = availableAlumnos.querySelectorAll('option:checked');

    console.log(selectedOptions);

    // Agrega las opciones seleccionadas al select de frutas seleccionadas, y elimina las opciones seleccionadas del select de frutas disponibles

    for (let i = 0; i < selectedOptions.length; i++) {

      const option = selectedOptions[i];

      const newOption = document.createElement('option');

      newOption.value = option.value;

      newOption.text = option.text;

      selectedAlumnos.add(newOption);

      availableAlumnos.removeChild(option);

    }

  });



  // Captura el select de frutas seleccionadas y el botón "Eliminar"

  const removeFruitButton = document.getElementById('btnMoveLeft');

  // Escucha el evento click del botón "Eliminar"

  removeFruitButton.addEventListener('click', function () {

    // Obtiene todas las opciones seleccionadas en el select de frutas seleccionadas

    const selectedOptions = selectedAlumnos.querySelectorAll('option:checked');



    // Agrega las opciones seleccionadas al select de frutas disponibles, y elimina las opciones seleccionadas del select de frutas seleccionadas

    for (let i = 0; i < selectedOptions.length; i++) {

      const option = selectedOptions[i];

      const newOption = document.createElement('option');

      newOption.value = option.value;

      newOption.text = option.text;

      availableAlumnos.add(newOption);

      selectedAlumnos.removeChild(option);

    }

  });

});
