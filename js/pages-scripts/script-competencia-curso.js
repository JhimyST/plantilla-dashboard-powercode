$(document).ready(function () {

  let btnApplyFilters = $("#apply-filters");
  let listasCursos = $("#columnCursos .lista-curso-item ul");
  let docentesOfCourses = $("#collapseDocentes1");
  let listaSemestres = $("#lista-competencias");

  //Capturar los selects y botones para el Diseño 2 de asignación de competencias y cursos

  const availableCursos = document.getElementById('leftSelectCursos');

  const addCursosButton = document.getElementById('btnMoveRight');

  const selectedCursos = document.getElementById('rightSelectCursos');

  const CursoLeftSearch = document.getElementById('cursos-left-search');
  const CursoRightSearch = document.getElementById('cursos-right-search');


    // Escucha el evento input del cuadro de búsqueda para filtrar las opciones
    buscarCurso(CursoLeftSearch, availableCursos);
    buscarCurso(CursoRightSearch, selectedCursos);
  
  
    function buscarCurso(iptBuscar, selectGroup){
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
  
    addCursosButton.addEventListener('click', function () {
  
      // Obtiene todas las opciones seleccionadas en el select de frutas disponibles
  
      const selectedOptions = availableCursos.querySelectorAll('option:checked');
  
      console.log(selectedOptions);
  
      // Agrega las opciones seleccionadas al select de frutas seleccionadas, y elimina las opciones seleccionadas del select de frutas disponibles
  
      for (let i = 0; i < selectedOptions.length; i++) {
  
        const option = selectedOptions[i];
  
        const newOption = document.createElement('option');
  
        newOption.value = option.value;
  
        newOption.text = option.text;
  
        selectedCursos.add(newOption);
  
        availableCursos.removeChild(option);
  
      }
  
    });
  
  
  
    // Captura el select de frutas seleccionadas y el botón "Eliminar"
  
    const removeFruitButton = document.getElementById('btnMoveLeft');
  
    // Escucha el evento click del botón "Eliminar"
  
    removeFruitButton.addEventListener('click', function () {
  
      // Obtiene todas las opciones seleccionadas en el select de frutas seleccionadas
  
      const selectedOptions = selectedCursos.querySelectorAll('option:checked');
  
  
  
      // Agrega las opciones seleccionadas al select de frutas disponibles, y elimina las opciones seleccionadas del select de frutas seleccionadas
  
      for (let i = 0; i < selectedOptions.length; i++) {
  
        const option = selectedOptions[i];
  
        const newOption = document.createElement('option');
  
        newOption.value = option.value;
  
        newOption.text = option.text;
  
        availableCursos.add(newOption);
  
        selectedCursos.removeChild(option);
  
      }
  
    });

});
