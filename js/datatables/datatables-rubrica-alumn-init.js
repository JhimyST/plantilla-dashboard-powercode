$(document).ready(function () {
  let table_rubrica_alumnos = $("#table-rubrica-alumnos");
  let inputExcel = document.getElementById("inputExcel");
  console.log(inputExcel);

  //importar excel
  class Excel {
    constructor(contentExcel) {
      this.content = contentExcel;
    }

    header() {
      return this.content[0];
    }

    registros() {
      return new ColeccionRegistros(this.content.slice(1, this.content.length));
    }
  }

  class ColeccionRegistros {
    constructor(registros) {
      this.registros = registros;
    }

    get(index) {
      return new Registro(this.registros[index]);
    }

    count() {
      return this.registros.length;
    }
  }

  class Registro {
    constructor(registro) {
      this.registro = registro;
    }
    codigoEstudiante() {
      return this.registro[0];
    }

    apellidosEstudiante() {
      return this.registro[1];
    }

    universidad() {
      return this.registro[2];
    }
  }

  class ExcelPrinter {
    static print(idDataTable, excel) {
      const table = document.getElementById(idDataTable);

      console.log(table);

      for (let index = 0; index < excel.registros().count(); index++) {
        const row = excel.registros().get(index);

        table.querySelector("tbody").innerHTML += `
                  
                  <tr>
                      <td>${row.codigoEstudiante()}</td>
                      <td>${row.apellidosEstudiante()}</td>
                      <td>${row.universidad()}</td>
                  </tr>
                  `;
      }
    }
  }

  /* Importando el archivo excel */

  inputExcel.addEventListener("change", async function (e) {
    e.preventDefault();

    const contentExcel = await readXlsxFile(inputExcel.files[0]);
    console.log("Usando contentExcel");
    console.log(contentExcel);
    const excel = new Excel(contentExcel);
    const registros = excel.registros().registros;
    const header = excel.header();
    console.log("Usando Registros");
    console.log(registros);
    console.log("Usando header");
    console.log(header);

    let columns = [];


    $("#confirmImport").click(function (e) {
      e.preventDefault();

      /* Headers dinámicos */
      header.forEach((element, i, array) => {

        console.log(array.length);
  
        if ((element) == "Consolidado") {
          columns.push({title:element, render: function (data, type, row, meta) {
            if (data === 1) {
              return `<span class="text-success fs-4"><i class="bi bi-1-circle"></i></span>`;
            } else if (data === 0) {
              return `<span class="text-danger fs-4"><i class="bi bi-0-circle"></i></span>`;
            } else {
              return data;
            }
            }, className: "text-center " });
        }else if (element == "Estado") {
          columns.push({title:element, render: function (data, type, row, meta) {
            if (data === 1) {
              return `<span class="badge text-bg-success">Calificado</span>`;
            } else if (data === 0) {
              return `<span class="badge text-bg-danger">Pendiente</span>`;
            } else {
              return data;
            }
            }, className: "text-center " });
        }else{
  
          columns.push({title:element, className: "text-center " });
        }
  
        if((array.length-1)== i ){
          columns.push({title: "Opciones", defaultContent: `
  
            <a id="edtAssessmentAlumno" class="btn btn-primary" href="./evaluacion-alumno.html" role="button"><i class="fa fa-pencil"></i></a>
    
            <a id="delAssessmentAlumno" class="btn btn-danger" href="#" role="button"><i class="fa fa-trash-o"></i></a>
            `, className: "text-center" });
        }
  
      });
      
      // Inicializando la tabla
      let tableRubricaAlumnos = table_rubrica_alumnos.DataTable({
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 20, 50, "All"],
        ],
        
        scrollX: true,
        fixedHeader: true,
        language: {
          decimal: "",
          emptyTable: "No hay información",
          info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
          infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
          infoFiltered: "(Filtrado de _MAX_ total entradas)",
          infoPostFix: "",
          thousands: ",",
          lengthMenu: "Mostrar _MENU_ Entradas",
          loadingRecords: "Cargando...",
          processing: "Procesando...",
          search: "Buscar:",
          zeroRecords: "Sin resultados encontrados",
          paginate: {
            first: "Primero",
            last: "Ultimo",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
        "data": registros,
        "columns": columns
      });
      /* tableRubricaAlumnos.columns.adjust().draw(); */

    });


  /* 	data.programmers.forEach((programmer, index) => {
      content += `
        <tr>
          <td>${index + 1}</td>
          <td>${programmer.name}</td>
          <td>${programmer.country}</td>
          <td>${programmer.birthday}</td>
          <td>${programmer.score}</td>
          <td>${programmer.score >= 8 
            ? "<i class='fa-solid fa-check' style='color: green;'></i>" 
            : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}
          </td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
            <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
          </td>
        </tr>`;
    });
    tableBody_programmers.innerHTML = content; */
  });
});
