$(document).ready(function () {
  let table_semestre_seccion = $("#table-semestre-seccion");
  let inputExcel = document.getElementById("inputExcel");
  let listaSemestres = $("#lista-semestres");
  let listaSecciones = $("#lista-secciones");
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

  /* Diseño de semestres -> cursos */

  // Manejando el active para cada opcion de la lista de semestres
  listaSemestres.find('button').click(function (e) {
    e.preventDefault();
    let idElement = $(this).attr("id");

    listaSemestres.find('button').each(function () {

      if (idElement == $(this).attr("id")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });

  // Manejando el active para cada opcion de la lista de cursos
  listaSecciones.find('button').click(function (e) {
    e.preventDefault();
    let idElement = $(this).attr("id");

    listaSecciones.find('button').each(function () {
      if (idElement == $(this).attr("id")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });  
  });

  /* Importando el archivo excel */

  inputExcel.addEventListener("change", async function (e) {
    e.preventDefault();

    const contentExcel = await readXlsxFile(inputExcel.files[0]);
    console.log("Usando contentExcel");
    console.log(contentExcel);
    const excel = new Excel(contentExcel);
    const registros = excel.registros().registros;

    console.log(registros);

    $("#confirmImport").click(function (e) {
      e.preventDefault();

      let tableCreacionSalon = table_semestre_seccion.DataTable({
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 20, 50, "All"],
        ],
        data: registros,
        /* scrollX: true, */
        /* deferRender: true,
        scrollCollapse: true,
        scroller: true, */
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
        columns: [
          { title: "Periodo Académico" },
          { title: "Facultad", className: "uniqueClassName" },
          { title: "Programa de Estudios", className: "uniqueClassName" },
          { title: "Semestre-Sección", className: "uniqueClassName" },
          { title: "Plan de Estudios", className: "uniqueClassName" },
          {
            title: "Opciones",
            defaultContent: `
          
          <div class="row g-2 mx-2">
            <div class="col col-lg-12 col-xl-6 d-flex align-items-center justify-content-center px-0 gap-1">

              <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicionFila"
								id="edtAssessmentAlumno" href="#" role="button"><i class="fa fa-pencil"></i></a>
							<!-- Modal añadir nuevo-->
							<div class="modal fade" id="modalEdicionFila" tabindex="-1" aria-labelledby="exampleModalLabel"
								aria-hidden="true">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
											<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div class="modal-body">
											<form>
												<div class="mb-3">
													<span class=" text-primary">Elija sus opciones para la creación de un salón.</span>
												</div>
												<!-- select periodo académico -->
												<div class="mb-3">
													<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
														<option selected>Periodo Académico</option>
														<option value="1">One</option>
														<option value="2">Two</option>
														<option value="3">Three</option>
													</select>
												</div>

												<div class="row">

													<!-- select facultad -->
													<div class="col mb-3">
														<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
															<option selected>Facultad</option>
															<option value="1">One</option>
															<option value="2">Two</option>
															<option value="3">Three</option>
														</select>
													</div>
													<!-- select Programa de Estudios -->
													<div class="col mb-3">
														<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
															<option selected>Programa de Estudios</option>
															<option value="1">One</option>
															<option value="2">Two</option>
															<option value="3">Three</option>
														</select>
													</div>
												</div>

												<div class="row">

													<!-- select Semestre -->
													<div class="col mb-3">
														<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
															<option selected>Semestre</option>
															<option value="1">One</option>
															<option value="2">Two</option>
															<option value="3">Three</option>
														</select>
													</div>
													<!-- select Sección -->
													<div class="col mb-3">
														<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
															<option selected>Sección</option>
															<option value="1">One</option>
															<option value="2">Two</option>
															<option value="3">Three</option>
														</select>
													</div>
												</div>

												<!-- select Plan de Estudios -->
												<div class="mb-3">
													<select class="form-select form-select-md mb-3" aria-label=".form-select-lg example">
														<option selected>Plan de Estudios</option>
														<option value="1">One</option>
														<option value="2">Two</option>
														<option value="3">Three</option>
													</select>
												</div>
											</form>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											<button type="button" class="btn btn-primary">Save changes</button>
										</div>
									</div>
								</div>
							</div>
              <a id="delAssessmentAlumno" class="btn btn-danger" href="#" role="button"><i class="fa fa-trash-o"></i></a>
            </div>
				  </div>
          `, className: "uniqueClassName"

          },
        ],
      });//fin del Datatable

      tableCreacionSalon.rows().nodes().each(function (element, i) {
        console.log("entro a la validacion xd");
        console.log(i);
        console.log($(this));
      });

    });
  });
});
