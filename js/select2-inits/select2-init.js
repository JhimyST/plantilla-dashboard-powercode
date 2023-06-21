$(document).ready(function () {

    //Inicializacion de select2 en el modalAsignarDocente
    $('#docente-select').select2({
      placeholder: "Buscar",
      dropdownParent: '#modalAsignarDocente',
    });

    //Inicializacion de select2 en el modalMatricEstud
    $('#alumno-select').select2({
      placeholder: "Buscar",
      dropdownParent: '#modalMatricEstud',  
    });
    $('#docente-select-matricula').select2({
      placeholder: "Buscar",
      dropdownParent: '#modalMatricEstud',
    });

    //Inicializacion de select2 en el ModalAsignarDocente
    $('#docente-select').select2({
      placeholder: "Buscar",
      dropdownParent: '#asignarDocente',
    });
  
    $('#formCompetenciaSelect').select2({
      placeholder: "Buscar",
    });
  
    $('#formCursosSelect').select2({
      placeholder: "Buscar",
    });
    $('#CompetenciaCursos').select2({
      placeholder: "Buscar",
    });
  

});
