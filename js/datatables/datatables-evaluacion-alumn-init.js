$(document).ready(function () {
  let tbody = $("#table-criterios-evaluacion tbody");
	let inputExcel = document.getElementById("inputExcel");
  console.log(inputExcel);

  /* Agregando radioButtons dinamicamente*/
  /* tbody.find("tr").each(function (i) {
    $(this).append(`
              
            <td>
              <!-- Opciones - score -->
  
							<div class="btn-group flex-column flex-xl-row" role="group" aria-label="Basic radio toggle button group">
  
									<input type="radio" class="btn-check" name="criterio${i + 1}" id="criterio${i + 1}-score0" autocomplete="off" value="score0"  style="display:none;">

									<label class="btn btn-light shadow-sm border rounded" for="criterio${i + 1}-score0">Insatisfactorio</label>

									


									<input type="radio" class="btn-check" name="criterio${i + 1}" id="criterio${i + 1}-score1" autocomplete="off" value="score1" style="display:none;" >

									<label class="btn btn-light shadow-sm border rounded" for="criterio${i + 1}-score1">En desarrollo</label>


									
									<input type="radio" class="btn-check" name="criterio${i + 1}" id="criterio${i + 1}-score2" autocomplete="off" value="score2" style="display:none;" >

									<label class="btn btn-light shadow-sm border rounded" for="criterio${i + 1}-score2">Suficiente</label>




									<input type="radio" class="btn-check" name="criterio${i + 1}" id="criterio${i + 1}-score3" autocomplete="off" value="score3" style="display:none;" >

									<label class="btn btn-light shadow-sm border rounded" for="criterio${i + 1}-score3">Sobresaliente</label>

							</div>
            </td>
      
              `);
  }); */

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

    console.log(registros);

    $("#confirmImport").click(function (e) {
      e.preventDefault();

    	let tableCriteriosEvaluacion =  $("#table-criterios-evaluacion").DataTable({
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 20, 50, "All"],
        ],
        data: registros,
				scrollX: true,
      	deferRender: true,
        scrollCollapse: true,
        scroller: true,
				language: {
					"decimal": "",
					"emptyTable": "No hay información",
					"info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
					"infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
					"infoFiltered": "(Filtrado de _MAX_ total entradas)",
					"infoPostFix": "",
					"thousands": ",",
					"lengthMenu": "Mostrar _MENU_ Entradas",
					"loadingRecords": "Cargando...",
					"processing": "Procesando...",
					"search": "Buscar:",
					"zeroRecords": "Sin resultados encontrados",
					"paginate": {
						"first": "Primero",
						"last": "Ultimo",
						"next": "Siguiente",
						"previous": "Anterior"
					}
				},
        columns: [
          { title: "Criterios" },
          {	title: "Opciones",
						render: function(data, type, row){
							/* console.log(data);
							console.log(type);
							console.log(row);
							console.log(registros); */
							return '<div class="btn-group flex-column flex-xl-row gap-2" role="group" aria-label="Basic radio toggle button group"><input type="radio" class="btn-check" name="criterio'+(registros.indexOf(row)+1)+'" value="score0" id="option1-'+registros.indexOf(row)+'" autocomplete="off" ><label class="btn btn-light shadow-sm rounded border d-flex align-items-center justify-content-center text-nowrap" for="option1-'+registros.indexOf(row)+'">Insatisfactorio</label><input type="radio" class="btn-check" name="criterio'+(registros.indexOf(row)+1)+'" value="score1" id="option2-'+registros.indexOf(row)+'" autocomplete="off"><label class="btn btn-light shadow-sm rounded border d-flex align-items-center justify-content-center text-nowrap" for="option2-'+registros.indexOf(row)+'">En desarrollo</label><input type="radio" class="btn-check" name="criterio'+(registros.indexOf(row)+1)+'" value="score2" id="option3-'+registros.indexOf(row)+'" autocomplete="off"><label class="btn btn-light shadow-sm rounded border d-flex align-items-center justify-content-center text-nowrap" for="option3-'+registros.indexOf(row)+'">Suficiente</label><input type="radio" class="btn-check" name="criterio'+(registros.indexOf(row)+1)+'" value="score3" id="option4-'+registros.indexOf(row)+'" autocomplete="off"><label class="btn btn-light shadow-sm rounded border d-flex align-items-center justify-content-center text-nowrap" for="option4-'+registros.indexOf(row)+'">Sobresaliente</label></div>'

							;
						} ,
							
          },
        ],
      });


			console.log(tableCriteriosEvaluacion);
			let arrFilas = tableCriteriosEvaluacion.rows();

			console.log(arrFilas);

			/* Validación y pintado del valor de cada radiobutton */
			tableCriteriosEvaluacion.rows().nodes().each(function (element, i) {
				console.log("entro a la validacion xd");
				console.log(i);
				console.log($(this));


		
				$(this)
					.find(`input[type='radio'][name='criterio${i + 1}']`)
					.on("change", function (e) {
						e.preventDefault();
						
						let radioButtons = $(`input[type='radio'][name='criterio${i + 1}']`);
		
						let radioButton = $(
							`input[type='radio'][name='criterio${i + 1}']:checked`
						);
						let notChecked = $(`input[type='radio'][name='criterio${i + 1}']:not(:checked)`);
						console.log("se hizo un cambio");
						console.log(radioButtons);
						console.log(radioButton.val());
						console.log('criterio: '+i);
						switch (radioButton.val()) {
							case "score0":
								console.log("Escogió el score0");
								radioButton.next().addClass("btn-danger");
								radioButton.next().removeClass("btn-light");
								notChecked.next().addClass("btn-light");
								notChecked.next().removeClass("btn-danger btn-success");
								break;
							case "score1":
								console.log("Escogió el score1");
								radioButton.next().addClass("btn-danger");
								radioButton.next().removeClass("btn-light");
								notChecked.next().addClass("btn-light");
								notChecked.next().removeClass("btn-danger btn-success");
								break;
							case "score2":
								console.log("Escogió el score2");
								radioButton.next().addClass("btn-success");
								radioButton.next().removeClass("btn-light");
								notChecked.next().addClass("btn-light");
								notChecked.next().removeClass("btn-success btn-danger");
								break;
							case "score3":
								console.log("Escogió el score3");
								radioButton.next().addClass("btn-success");
								radioButton.next().removeClass("btn-light");
								notChecked.next().addClass("btn-light");
								notChecked.next().removeClass("btn-success btn-danger");
								break;
		
							default:
								break;
						}
					});
			});

    });

  });

	

});
