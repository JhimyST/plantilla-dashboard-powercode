$(document).ready(function () {

    /* Inicializacion de select 2 en el modalAsignarDocente*/
    $('#docente-select').select2({
      placeholder: "Buscar",
      dropdownParent: '#modalAsignarDocente',
    });

    /* Inicializacion de select 2 en el modalMatricEstud*/
    $('#alumno-select').select2({
      placeholder: "Buscar",
      dropdownParent: '#modalMatricEstud',
    });
  
});
