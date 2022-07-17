/*
    Variables auxiliares
*/
var category_search='null'
var filter_search_now='NAME';


/*
    Busqueda
*/
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
$( ".buscar" ).autocomplete({
  source: function( request, response ) {
    $(".icon-container").css({"opacity":"1"});
    $.ajax({
      type:'GET',
      url: 'http://mybsaletest.000webhostapp.com/api/search?filtro='+filter_search_now+"&campo="+$('.buscar').val()+"&category="+category_search,
      headers: {"Accept": "application/json"},
      dataType:"json",
      data: {
        _token: CSRF_TOKEN,
        search: request.term
     },
      success: function(json){
        response(json.message);
      }
    });
  },
    select: function (event, ui) {
        $('.buscar').val(ui.item.label);
        document.getElementById('modal-title').innerHTML= ui.item.label;
        document.getElementById('modal-body').innerHTML=
        '<img src="'+ui.item.image+'" alt="Producto" width="200" height="250">'+
        '<p></p>'+
        '<strong class="d-inline-block mb-2 text-primary"> $'+ui.item.price+'</strong>'+
        '<div class="mb-1 text-muted">'+
            'Descuento: $'+ui.item.discount+
        '</div>';
        var myModal = new bootstrap.Modal(document.getElementById('result_search_modal'));
        myModal.show();
     return false;
    }
});


/*
    Busqueda por filtro
*/
function search_filter(filter){
    document.getElementById('filter_search_now').innerHTML = filter;
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
    document.getElementById('dropdownMenuButton').innerHTML = categories;
    category_search = id_category_search;
}

