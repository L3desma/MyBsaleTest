# Frontend
[MyBsaleTest](https://mybsaletest.000webhostapp.com/)

Vista inicial del proyecto, donde se muestran las cartas de los productos en paginación de 6 en 6.

![Paginia princiapal!](/back/img/front/pagination.gif)

La página cuenta con un menú lateral en donde el usuario podrá escoger algún filtro y categoría para ordenar los productos, todo esto sin perder la paginación.

![Paginia princiapal!](/back/img/front/menu_lateral.gif)

La barra de búsqueda cuenta con filtros y categorías, esto nos devolverá los productos que coincidan en forma de lista, al hacer clic este nos arrojara un modal en donde podremos ver el producto.

![Paginia princiapal!](/back/img/front/busqueda.gif)


# API REST

API REST que despliega productos que pueden ser agrupados por la categoría a la que pertenecen.

```  https://mybsaletest.000webhostapp.com/ ```

## GET - Lista de productos

Devuelve la lista de los productos.
+ URL
``` api/list_product ```

Parámetros URL:
+ ``` ?page ```
(Opcional) Número de página especifico que va a devolver el servicio.

```json
{
 "message":{
	 "current_page":1,
	 "data":[
	 {
		 "id":5,
		 "name":"ENERGETICA MR BIG",
		 "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
		 "price":1490,
		 "discount":20,
		 "category":1
	 }
],
	 "first_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=1",
	 "from":1,
	 "last_page":10,
	 "last_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=10",
	 "links":[],
	 "next_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=2",
	 "path":"https://mybsaletest.000webhostapp.com/api/list_product",
	 "per_page":6,
	 "prev_page_url":null,
	 "to":6,
	 "total":57
 }
}
```
+ **message:** mensaje completo del api
+ **current_page:** página actual
+ **data:** toda la información de la página 1
+ **first_page_url:** url de la página 1
+ **last_page:** páginas totales
+ **last_page_url:** url de la ultima página
+ **next_page_url:** url de la página siguiente según nuestra posición
+ **path:** url de la petición realizada
+ **per_page:** cantidad de datos por página
+ **prev_page_url:** url de la página anterior según nuestra posición
+ **total:** datos totales (int)


## GET - Búsqueda

Devuelve la lista de los productos.
+ URL
``` api/search ```

Parámetros URL:
+ ``` ?campo ```
(Obligatorio) Letras o palabras de busqueda

+ ``` ?filtro ```
(Obligatorio) Filtro por el cual se realizara la busqueda
```json
{
    "message": [
        {
            "id": 5,
            "label": "ENERGETICA MR BIG",
            "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "category": 1,
            "price": 1490,
            "discount": 20
        }
    ]
}
```
+ **message:** mensaje completo del api
+ **id:** id del producto
+ **label:** nombre del producto
+ **image:** url de la imagen del producto
+ **category:** categoria a la que pertenece (int)
+ **price:** precio del producto (int)
+ **discount:** descuento del producto (int)

## GET - Catálogo de categorías

Devuelve las categorías de los productos
+ URL
``` api/get_category```

```json
{
    "message": [
        {
            "id": 1,
            "name": "bebida energetica"
        }
    ]
}
```
+ **message:** mensaje completo del api
+ **id:** id del producto (int)
+ **name:** nombre de la categoría

## GET - Catálogo de Filtros

Devuelve los filtros.
+ URL
``` api/order_product_category ```

Parámetros URL:
+ ``` ?id_category ```
(Obligatorio) ID del catálogo de categorías.
+ ``` ?page```
(Opcional) Número de página.
+ ``` ?filtro```
(Opcional) Ordenar por:

   - NAME_ASC: Por nombre de forma ascendente
   - NAME_DESC: Por nombre de forma descendente.
   - PRICE_ASC: Por precio de forma ascendente.
   - PRICE_DESC: Por precio de forma descendente.

```json
{
 "message":{
	 "current_page":1,
	 "data":[
	 {
		 "id":5,
		 "name":"ENERGETICA MR BIG",
		 "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
		 "price":1490,
		 "discount":20,
		 "category":1
	 }
],
	 "first_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=1",
	 "from":1,
	 "last_page":10,
	 "last_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=10",
	 "links":[],
	 "next_page_url":"https://mybsaletest.000webhostapp.com/api/list_product?page=2",
	 "path":"https://mybsaletest.000webhostapp.com/api/list_product",
	 "per_page":6,
	 "prev_page_url":null,
	 "to":6,
	 "total":57
 }
}
```
+ **message:** mensaje completo del api
+ **current_page:** página actual
+ **data:** toda la información de la página 1
+ **first_page_url:** url de la página 1
+ **last_page:** páginas totales
+ **last_page_url:** url de la ultima página
+ **next_page_url:** url de la página siguiente según nuestra posición
+ **path:** url de la petición realizada
+ **per_page:** cantidad de datos por página
+ **prev_page_url:** url de la página anterior según nuestra posición
+ **total:** datos totales (int)
