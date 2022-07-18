/*
    Variables auxiliares
*/
var element_old='';
var element_old_filter = '';


/*
    obtenemos las categorias de la base de datos
*/
function get_categories() {
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
                    content+='<a id="'+element['name']+'_'+element['id']+'" onclick="categories('+element['id']+',\'\',\''+element['name']+'_'+element['id']+'\',\'\')" href="#'+element['id']+'">'+element['name']+'</a>';
                    content_search += '<a class="dropdown-item" type="buton" onclick="categoria_search(\''+element['name']+'\','+element['id']+')">'+element['name']+'</a>';
                });

                content_search += '<a class="dropdown-item" type="buton" onclick="categoria_search(\'Todos\',\'null\')">Todos</a>';
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

    if(id_category != 0 && id_element != 0 ){
        localStorage.setItem('id_category_old',id_category);

        if(element_old === '' ){
            document.getElementById(id_element).classList.add("active");
        }
        else if ( element_old != id_element){
            document.getElementById(element_old).classList.remove("active");
            document.getElementById(id_element).classList.add("active");
        }
        element_old = id_element;
        localStorage.setItem('element_old',element_old);
    }
    if(filtro != 0){
        filters(filtro);

        localStorage.setItem('ifiltro_old',filtro);
    }


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
                document.getElementById("container").innerHTML = content;
                document.getElementById("number-pagination").innerHTML = 'Pagina actual: '+response.message.current_page+'-'+response.message.last_page;
                // selecting required element

                let totalPages = response.message.last_page;//total de paginas
                let page = response.message.current_page;//pagina actual
                document.querySelector(".pagination ul").innerHTML = createPagination_categories(totalPages, page,id_category);
                var filtro_original_name='ninguno';
                if(localStorage.getItem('ifiltro_old') === 'PRICE_DESC'){
                    filtro_original_name = 'De mayor a menor precio'
                }else if(localStorage.getItem('ifiltro_old') === 'PRICE_ASC'){
                    filtro_original_name = 'De menor a mayor precio'
                }else if(localStorage.getItem('ifiltro_old') === 'NAME_ASC'){
                    filtro_original_name = 'Nombre A-Z'
                }else if(localStorage.getItem('ifiltro_old') === 'NAME_DESC'){
                    filtro_original_name = 'Nombre Z-A'
                }
                document.getElementById("filters").innerHTML = 'Categoria: '+localStorage.getItem('element_old').split("_",1)+' | Filtro: '+filtro_original_name;
            }else{
              error();
            }
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
          liTag += `<li class="btn prev" onclick="categories(${category},${page - 1},0,0)"><span><i class="fas fa-angle-left"></i> Anterior</span></li>`;
        }
        if(page > 2){
          liTag += `<li class="first numb" onclick="categories(${category},1,0,0)"><span>1</span></li>`;
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
          liTag += `<li class="numb ${active}" onclick="categories(${category},${plength},0,0)"><span>${plength}</span></li>`;
        }
        if(page < totalPages - 1){
          if(page < totalPages - 2){
            liTag += `<li class="dots"><span>...</span></li>`;
          }
          liTag += `<li class="last numb" onclick="categories(${category},${totalPages},0,0)"><span>${totalPages}</span></li>`;
        }
        if (page < totalPages) {
          liTag += `<li class="btn next" onclick="categories(${category},${page + 1},0,0)"><span>Siguiente <i class="fas fa-angle-right"></i></span></li>`;
        }
        document.querySelector(".pagination ul").innerHTML = liTag;
        return liTag;
}












