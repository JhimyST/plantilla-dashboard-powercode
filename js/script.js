$(document).ready(function () {
  
  //Declaramos variables
  let menu_side = $("#menu_side");
  let body = $("#body");
  let navbar = $("#navbar");
  let submenu_title = $(".submenu-title");

  //Quitar la visualizacion de los h4 y el titulo de los submenus al cargar la pagina
  $(".menu__side h4").addClass("visually-hidden");
  $(".submenu-title .title").addClass("visually-hidden");

  //Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página
  if (window.innerWidth < 760) {
    body.addClass("body_hidden");
    menu_side.addClass("menu__side_hidden");
    navbar.css("width", "100%");
  }

  /* Evento para mostrar y ocultar menú con el boton bars */
  
  $("#btn_open").on("click", function () {
    body.toggleClass("body_move");
    menu_side.toggleClass("menu__side_move");

    //verificando primero el tamaño de la pantalla
    if (window.innerWidth > 760) {
      //mayor a 760px
      if (menu_side.hasClass("menu__side_move")) {
        body.removeClass("body_hidden");

        $(".menu__side h4").removeClass("visually-hidden");
        $(".menu__side h5").removeClass("visually-hidden");
        $(".submenu-title .title").removeClass("visually-hidden");

        navbar.css({
          width: "calc(100% - 260px)",
          transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        });

        mostrarSubmenu();

      } else {
        $(".menu__side h4").addClass("visually-hidden");
        $(".menu__side h5").addClass("visually-hidden");
        $(".submenu-title .title").addClass("visually-hidden");

        navbar.css({
          width: "calc(100% - 90px)",
          transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        });

        ocultarSubmenu();

      }
    } else {
      //menor a 760px

      if (menu_side.hasClass("menu__side_move")) {
        body.removeClass("body_hidden");
        menu_side.removeClass("menu__side_hidden");
        $(".menu__side h4").removeClass("visually-hidden");
        $(".menu__side h5").removeClass("visually-hidden");
        $(".submenu-title .title").removeClass("visually-hidden");
        navbar.css({
          width: "calc(100% - 260px)",
          transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        });
      } else {
        body.addClass("body_hidden");
        menu_side.addClass("menu__side_hidden");
        $(".menu__side h4").addClass("visually-hidden");
        $(".menu__side h5").addClass("visually-hidden");
        $(".submenu-title .title").addClass("visually-hidden");
        navbar.css({
          width: "100%",
          transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        });
      }
    }
  });


  /* Expandir sidebar al hacer click en alguna opcion */

  $("#options-menu a.link-option").on("click", function (e) {
   
    let idElement = $(this).attr("id");
    
    expandirSidebar(); //muestra el sidebar al 260px

    $("#options-menu a.link-option").each(function () {
      console.log(idElement);

      if (idElement == $(this).attr("id")) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });
  });

  /* Expandir sidebar al hacer click en un submenu */
  $("#options-menu a.submenu-title").on("click", function (e) {
    
    let idElement = $(this).attr("id");
    console.log(idElement);
    expandirSidebar(); //muestra6 el sidebar al 260px

    $("#options-menu a.submenu-title").each(function (){

      console.log($(this));
      
      if (idElement == $(this).attr("id")){
        $(this).find('h4, i').addClass("fw-semibold text-light");
      }else{
        $(this).find('h4, i').removeClass("fw-semibold text-light");
      }
    });

  });

  /* Manejando submenus */
  submenu_title.each(function () {
    $(this).on("click", function (e) {
      $(this).parent().toggleClass("showMenu");

    });
  });

  //Expandir al hacer click en ayuda
  $(".ayuda a").on("click", function (e) {
    
    let idElement = $(this).attr("id");

    expandirSidebar(); //muestra el sidebar al 260px
  });

  /* Haciendo el menú responsive(adaptable) */
  window.addEventListener("resize", function () {
    body.removeClass("body_move");
    menu_side.removeClass("menu__side_move");

    if (window.innerWidth > 760) {
      menu_side.removeClass("menu__side_hidden");
      body.removeClass("body_hidden");

      $(".menu__side h4").addClass("visually-hidden");
      $(".menu__side h5").addClass("visually-hidden");
      $(".submenu-title .title").addClass("visually-hidden");
      navbar.css({
        width: "calc(100% - 90px)",
        transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      });
      ocultarSubmenu();

    } else {
      body.addClass("body_hidden");
      menu_side.addClass("menu__side_hidden");
      navbar.css({
        width: "100%",
        transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      });
    }
  });

   /* Funcion para el eventio click en las opciones y el help del sidebar */
   
   function expandirSidebar() {
     body.addClass("body_move");
     menu_side.addClass("menu__side_move");
     menu_side.removeClass("menu__side_hidden");
     navbar.css({
       width: "calc(100% - 260px)",
       transition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
     });
 
     $(".menu__side h4").removeClass("visually-hidden");
     $(".menu__side h5").removeClass("visually-hidden");
     $(".submenu-title .title").removeClass("visually-hidden");
   }
   
   /* Funciones para mostrar y ocultar los submenu */
   
   function mostrarSubmenu(){
     $("#options-menu a.link-option").each(function(){
       if ($(this).hasClass("selected") && $(this).hasClass("submenu-item")) {
        submenu_title.parent().addClass("showMenu");
       }
     });
   }
   function ocultarSubmenu(){
     $("#options-menu a.link-option").each(function(){
       if ($(this).hasClass("selected") && $(this).hasClass("submenu-item")) {
        submenu_title.parent().removeClass("showMenu");
       }else if ($(this).hasClass("selected") && ($(this).hasClass("submenu-item") == false )){
        submenu_title.parent().removeClass("showMenu");
       }
     });
   }

});
