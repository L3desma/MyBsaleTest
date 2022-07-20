//esperamos a que la pagina termine de cargar
window.addEventListener("load", function(event) {
    var filtro = localStorage.getItem('element_old_filter') || 'vacio';
    get_categories();
    if( filtro === 'vacio'){
        ApiRest(1);
    }else{

        filters(localStorage.getItem('element_old_filter'));
    }
});

/*
    ocultamiento de gif de carga
*/
function load(){
    $(".loader").fadeOut("slow");
}


/*
    ocultar y mostrar svg animacion
*/
function animation_menu(x) {
    x.classList.toggle("change");
    nav_bar();
}
/*
     ocultar y mostrar menu
*/
function nav_bar(){
    if(document.getElementById("sidebar").offsetWidth != 250){
        document.getElementById("sidebar").style.setProperty('margin-left', '-250px');
    }else{
        document.getElementById("sidebar").style.setProperty('margin-left', '0px');
    }
}




/*
    listar produtos de forma desordenada
*/
function ApiRest(page) {
    const request = new XMLHttpRequest();
    const endPonint = 'https://mybsaletest.000webhostapp.com/api/list_product?page='+page;
    request.open('GET',endPonint,true);
    request.send();
    var content = '';
    request.onreadystatechange = function(){
        if(request.readyState === 4){
            if(request.status === 200){
                const response = JSON.parse(request.response);
                response.message.data.forEach((element,index,arr) => {

                    content +=
                    '<div class="col-md-6">'+
                        '<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">'+
                            '<div class="col p-4 d-flex flex-column position-static">'+
                                '<p class="d-none">'+element['id']+'</p>'+
                                '<p class="d-none">'+element['category']+'</p>'+
                                '<h3 class="mb-0">'+element['name']+'</h3>'+
                                '<strong class="d-inline-block mb-2 text-primary"> $'+element['price']+'</strong>'+
                                '<div class="mb-1 text-muted">'+
                                    'Descuento: $'+element['discount']+
                                '</div>'+
                                '<svg xmlns="https://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">'+
                                    '<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>'+
                                '</svg>'+
                            '</div>'+
                            '<div class="col-auto d-none d-lg-block">'+
                                '<img src="'+element['url_image']+'" alt="Producto" width="200" height="250">'+
                            '</div>'+
                        '</div>'+
                    '</div>'

                });
                document.getElementById("container").innerHTML = content;
                document.getElementById("number-pagination").innerHTML = 'Pagina actual: '+response.message.current_page+'-'+response.message.last_page;
                let totalPages = response.message.last_page;//total de paginas
                let page = response.message.current_page;//pagina actual
                document.querySelector(".pagination ul").innerHTML = createPagination(totalPages, page);
                load();
            }else{
                error();
            }
        }
    }
}
/*
    creacion de paginación
*/
function createPagination(totalPages, page){
    let liTag = '';
    let active;
    let beforePage;
    let afterPage ;
    if (totalPages==1) {
      totalPages=0;
      beforePage= 2;
      afterPage= 1;
    }if (totalPages==2) {
       beforePage= page + 1;
       afterPage= page + 1;
    }
    else {
      beforePage = page - 1;
      afterPage = page + 1;
    }
  if(page > 1){
    liTag += `<li class="btn prev" onclick="ApiRest(${page - 1})"><span><i class="fas fa-angle-left"></i> Anterior</span></li>`;
  }
  if(page > 2){
    liTag += `<li class="first numb" onclick="ApiRest(1)"><span>1</span></li>`;
    if(page > 3){
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if(page == plength){
      active = "active";
    }else{
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="ApiRest(${plength})"><span>${plength}</span></li>`;
  }
  if(page < totalPages - 1){
    if(page < totalPages - 2){
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="ApiRest(${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="ApiRest(${page + 1})"><span>Siguiente <i class="fas fa-angle-right"></i></span></li>`;
  }
  document.querySelector(".pagination ul").innerHTML = liTag;
  return liTag;
}





//error en repsuesta al api
function error(){
  document.getElementById('alert-error').classList.remove("d-none");
}
function close_error_alert(){
  document.getElementById('alert-error').classList.add("d-none");
}



