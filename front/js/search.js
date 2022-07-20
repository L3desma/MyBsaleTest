/*
    Variables auxiliares
*/
var category_search='null'
var filter_search_now='NAME';


/*
    Busqueda
*/
//activar busqueda por tecla ENTER
$(".buscar").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        //actiamos la busqueda 
        $('.buscar').autocomplete( "search", $('.buscar').val());
        $(".icon-container").css({"opacity":"1"});
    }
});

//activar busqueda por boton 
$('#button_search').click(function() {
    //activamos la busqueda
    $('.buscar').autocomplete( "search", $('.buscar').val());
    $(".icon-container").css({"opacity":"1"});
});

//activar autocompletado
$( ".buscar" ).autocomplete({
    source: function( request, response ) {
        $(".icon-container").css({"opacity":"1"});
        //peticion get
        $.ajax({
            type:'GET',
            url: 'https://mybsaletest.000webhostapp.com/api/search?filtro='+filter_search_now+"&campo="+$('.buscar').val()+"&category="+category_search,
            headers: {"Accept": "application/json"},
            dataType:"json",
            success: function(json){
                response(json.message);//seteamos el response por nuestro array que recibimos de respuesta
            }
        });
    },
    select: function (event, ui) {//accion a realizar cada vez que se selecciona un item
        $('.buscar').val(ui.item.label);//seteamos el nombre en la barara de busqueda
        document.getElementById('modal-title').innerHTML= ui.item.label;//setemos el titulo del modal que se abrira
        //seteamos el contenido del modal con la informacion obtenida
        document.getElementById('modal-body').innerHTML=
        '<img src="'+ui.item.image+'" alt="Producto" width="200" height="250">'+
        '<p></p>'+
        '<strong class="d-inline-block mb-2 text-primary"> $'+ui.item.price+'</strong>'+
        '<div class="mb-1 text-muted">'+
            'Descuento: $'+ui.item.discount+
        '</div>';
        //cresmo sun nuevo objeto modal y lo mostramos 
        var myModal = new bootstrap.Modal(document.getElementById('result_search_modal'));
        myModal.show();
     return false;
    }
});


/*
    Busqueda por filtro
*/
function search_filter(filter){
    document.getElementById('filter_search_now').innerHTML = filter;//setemos el filtro actual
    //setemos la variable por una obligatoria que el api acepte
    if(document.getElementById('filter_search_now').innerHTML === 'Nombre'){
        filter_search_now ='NAME';
    }else if(document.getElementById('filter_search_now').innerHTML === 'Precio'){
        filter_search_now ='PRICE';
    }
}


/*
    Busqueda por categoria
*/
function categoria_search(categories,id_category_search){
    //setemos la categoria seleccionada 
    document.getElementById('dropdownMenuButton').innerHTML = categories;
    category_search = id_category_search;
}