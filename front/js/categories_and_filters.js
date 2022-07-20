/*
    Variables auxiliares
*/
var element_old='';
var element_old_filter = '';


/*
    obtenemos las categorias de la base de datos
*/
function get_categories() {
    //peticion get
    const request = new XMLHttpRequest();
    const endPonint = 'https://mybsaletest.000webhostapp.com/api/get_category';
    request.open('GET',endPonint,true);
    request.send();
    var content='';
    var content_search='';
    request.onreadystatechange = function(){
        if(request.readyState === 4){
            if(request.status === 200){//respuesta exitosa
                const response = JSON.parse(request.response);
                response.message.forEach((element,index,arr) => {
                    //alamacenamos la respuesta en una etiqueta <a> dentro de las variables content y content_search
                    content+='<a id="'+element['name']+'_'+element['id']+'" onclick="categories('+element['id']+',\'\',\''+element['name']+'_'+element['id']+'\',\'\')" href="#'+element['id']+'">'+element['name']+'</a>';
                    content_search += '<a class="dropdown-item" type="buton" onclick="categoria_search(\''+element['name']+'\','+element['id']+')">'+element['name']+'</a>';
                });
                //agemos una etique extra a content_search el cual tendra la opcion Todos
                content_search += '<a class="dropdown-item" type="buton" onclick="categoria_search(\'Todos\',\'null\')">Todos</a>';
                //setemos el contenido de categies y categories_search, por las varibales content y content_seach respectivamente
                document.getElementById('categories').innerHTML =content;
                document.getElementById('categories_search').innerHTML = content_search;
                categories(localStorage.getItem('id_category_old'),0,localStorage.getItem('element_old'),localStorage.getItem('ifiltro_old'));
                load();
            }else{//error en la respuesta
              error();
            }
        }
    }
}



/*
    aplicando categorias y filtros en consulta
*/
function categories(id_category,page,id_element,filtro){
  document.getElementById('cargando').style.display='revert';//pantalla de carga
    if(id_category != 0 && id_element != 0 ){//verificamos que la solicitud este metodo contenga un id de categori y un id del element
        localStorage.setItem('id_category_old',id_category);

        if(element_old === '' ){//si no hay un elemneto arteior seleccionado como lo es la primera vez
            document.getElementById(id_element).classList.add("active");//se activa el elemento seleccionado
        }
        else if ( element_old != id_element){//activamos el elemento nuevo recien seleccionado y descativamos el elemento anterior mente seleccionado
            document.getElementById(element_old).classList.remove("active");
            document.getElementById(id_element).classList.add("active");
        }
        element_old = id_element;//renovamos el elemento mas viejo seleccionado
        localStorage.setItem('element_old',element_old);//lo alamacenamos en storage 
    }
    if(filtro != 0){//verificacmos que el leemento no sea igual a 0
        filters(filtro);
        localStorage.setItem('ifiltro_old',filtro);
    }

    //peticion get
    const request = new XMLHttpRequest();
    const endPonint = 'https://mybsaletest.000webhostapp.com/api/order_product_category?id_category='+localStorage.getItem('id_category_old')+'&page='+page+'&filtro='+localStorage.getItem('ifiltro_old');
    request.open('GET',endPonint,true);
    request.send();
    var content=''
    request.onreadystatechange = function(){
        if(request.readyState === 4){
            if(request.status === 200){
                const response = JSON.parse(request.response);
                response.message.data.forEach((element,index,arr) => {
                    //vamos almacenando lo recibiddo en una carta
                    content += '<div class="col-md-6">'+
                    '<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">'+
                    '<div class="col p-4 d-flex flex-column position-static">'+
                        '<p class="d-none">'+element['id']+'</p>'+
                        '<p class="d-none">'+element['category']+'</p>'+
                        '<h3 class="mb-0">'+element['name']+'</h3>'+
                        '<strong class="d-inline-block mb-2 text-primary"> $'+element['price']+'</strong>'+
                        '<div class="mb-1 text-muted">Descuento: $'+element['discount']+'</div>'+
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
                document.getElementById("container").innerHTML = content;//seteamos el contenido con lo almacenado en la variable 'content'
                document.getElementById("number-pagination").innerHTML = 'Pagina actual: '+response.message.current_page+'-'+response.message.last_page;//seatemos la pagina actual con ayuda de la respuesta del api
                

                let totalPages = response.message.last_page;//total de paginas
                let page = response.message.current_page;//pagina actual
                document.querySelector(".pagination ul").innerHTML = createPagination_categories(totalPages, page,id_category);
                var filtro_original_name='ninguno';
                //obtenemos el nombre original del filtro
                if(localStorage.getItem('ifiltro_old') === 'PRICE_DESC'){
                    filtro_original_name = 'De mayor a menor precio'
                }else if(localStorage.getItem('ifiltro_old') === 'PRICE_ASC'){
                    filtro_original_name = 'De menor a mayor precio'
                }else if(localStorage.getItem('ifiltro_old') === 'NAME_ASC'){
                    filtro_original_name = 'Nombre A-Z'
                }else if(localStorage.getItem('ifiltro_old') === 'NAME_DESC'){
                    filtro_original_name = 'Nombre Z-A'
                }
                //seteamos la categoria actual y el filtro actual apliacados
                document.getElementById("filters").innerHTML = 'Categoria: '+localStorage.getItem('element_old').split("_",1)+' | Filtro: '+filtro_original_name;
                
            }else{
              error();
            }
            document.getElementById('cargando').style.display='none';//oculamos pantalla de carga
        }
    }
}

/*
    active css a el filtro seleccionado
*/
function filters(filter){
    if(element_old_filter === '' ){
        document.getElementById(filter).classList.add("active");
    }
    else if ( element_old_filter != filter){
        document.getElementById(element_old_filter).classList.remove("active");
        document.getElementById(filter).classList.add("active");
    }
    element_old_filter = filter;
    localStorage.setItem('element_old_filter',element_old_filter);
}


/*
    paginacion con filtro y categorización
*/
function createPagination_categories(totalPages, page, category){
  let liTag = '';
  let active;
  let beforePage;
  let afterPage ;
  if (totalPages==1) { //si el total de paginas es 1 seteamos las variables
    totalPages=0;
    beforePage= 2;
    afterPage= 1;
  }if (totalPages==2) {//si el total de paginas es 2 agregamos 1 a beforepage y a afterpage
     beforePage= page + 1;
     afterPage= page + 1;
  }
  else {//caso contrario se resta 1 a beforepage y sumamos 1 a afterpage
    beforePage = page - 1;
    afterPage = page + 1;
  }
  if(page > 1){//mostrar el siguiente botón si el valor de la página es mayor que 1
    liTag += `<li class="btn prev" onclick="categories(${category},${page - 1},0,0)"><span><i class="fas fa-angle-left"></i> Anterior</span></li>`;
  }
  if(page > 2){//si el valor de la página es inferior a 2, agregue 1 después del botón anterior
    liTag += `<li class="first numb" onclick="categories(${category},1,0,0)"><span>1</span></li>`;
    if(page > 3){//si el valor de la página es mayor que 3, agregue esto (...) después del primer li o página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  //cuántas páginas o li se muestran antes del li actual
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // cuántas páginas o li se muestran después del li actual
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {//si plength es mayor que la longitud total de la página, continúe
      continue;
    }
    if (plength == 0) {// si plength es 0 entonces agregue +1 en el valor de plength
      plength = plength + 1;
    }
    if(page == plength){//si la página es igual a plength entonces asigne una cadena activa en la variable activa
      active = "active";
    }else{//de lo contrario, deje vacío a la variable activa
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="categories(${category},${plength},0,0)"><span>${plength}</span></li>`;
  }
  if(page < totalPages - 1){//si el valor de la página es menor que el valor de la página total en -1, muestre el último li o la última página
    if(page < totalPages - 2){//si el valor de la página es menor que el valor de la página total en -2, agregue esto (...) antes del último li o página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="categories(${category},${totalPages},0,0)"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {//mostrar el botón siguiente  si el valor de la página es menor que totalPage(20)
    liTag += `<li class="btn next" onclick="categories(${category},${page + 1},0,0)"><span>Siguiente <i class="fas fa-angle-right"></i></span></li>`;
  }
  document.querySelector(".pagination ul").innerHTML = liTag;
  return liTag;//retornamos litag
}