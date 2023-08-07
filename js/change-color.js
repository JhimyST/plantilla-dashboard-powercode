var muestrario;
var colorPredeterminado = "#0000ff";
window.addEventListener("load", startup, false);

function startup() {
  muestrario = document.querySelector("#muestrario");
  muestrario.value = colorPredeterminado;
  /* muestrario.addEventListener("input", actualizarPrimero, false); */
  muestrario.addEventListener("change", actualizarSideBar, false);
  muestrario.select();
}

function actualizarSideBar(event) {
  let menu_side = document.querySelectorById("#menu_side");

  if (menu_side) {
    menu_side.style.color = event.target.value;
  }
}

