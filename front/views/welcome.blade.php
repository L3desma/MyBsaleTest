<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" id="icon" href="img/tienda.png" ></link>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tienda-online</title>

        <!-- Necesario para busqueda -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />

        <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
        <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


        <link id="estilos" rel="stylesheet" href="css/style.css">
        <script src="js/main.js" type="text/javascript" charset="utf-8" async defer></script>
        <script src="js/search.js" type="text/javascript" charset="utf-8" async defer></script>
        <script src="js/categories_and_filters.js" type="text/javascript" charset="utf-8" async defer></script>

    </head>
    <body class="antialiased">
        <!-- Alert error -->
        <div id="alert-error" class="alert alert-danger alert-dismissible d-none">
            <strong>Oops!</strong> Ha ocurrido un error inesperado, vuelve a intentarlo más tarde
            <a type="button" class="btn-close" onclick="close_error_alert()" aria-label="Close"></a>
        </div>
        <!--pantalla de carga-->
        <div class="loader" id="cargando">
            <span class="visually-hidden">Cargando...</span>
        </div>

        <!-- Modal Result Search -->
        <div class="modal fade" id="result_search_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 id="modal-title" class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div id="modal-body" class="modal-body text-center">
                ...
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">cerrar</button>
                <button type="button" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </div>

        <!-- Header de busqueda-->
        <header class="p-3 mb-3 border-bottom">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    
                    <!-- menu desplegable que contiene los filtros de busqueda -->
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 " >
                        Buscar por:
                        <div class="dropdown">
                            <button id="filter_search_now" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nombre
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <a  class="dropdown-item d-flex gap-2 align-items-center" type="button" onclick="search_filter('Nombre')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                        </svg>
                                        Nombre
                                    </a>
                                </li>
                                <li>
                                    <a  class="dropdown-item d-flex gap-2 align-items-center" type="button" onclick="search_filter('Precio')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                                        </svg>
                                        Precio
                                    </a>
                                </li>
                            </div>
                        </div>
                        <!-- menu desplegable que contiene las categorias de busqueda -->
                        <div class="dropdown ml-2">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Todos
                            </button>
                            <!-- categorias de los productos busqueda -->
                            <div id="categories_search" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <!-- categorias de los productos desde javascript -->
                            </div>
                        </div>
                    </ul>
                    <!--Buscar-->

                    <div class="caja justify-content-center d-flex">
                       
                            
                            <span class="pointer pl4 c-link flex bg-white search_icon" type="button" id="button_search">
                                <svg class="vtex__icon-search  " width="14" height="14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.707 13.293L13 10.586C13.63 9.536 14 8.311 14 7C14 3.14 10.859 0 7 0C3.141 0 0 3.14 0 7C0 10.86 3.141 14 7 14C8.312 14 9.536 13.631 10.586 13L13.293 15.707C13.488 15.902 13.744 16 14 16C14.256 16 14.512 15.902 14.707 15.707L15.707 14.707C16.098 14.316 16.098 13.684 15.707 13.293ZM7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C9.761 2 12 4.239 12 7C12 9.761 9.761 12 7 12Z" fill="currentColor">
                                    </path>
                                </svg>
                            </span>
                    
                            <input
                            type="search"
                            class="form-control form-control-dark buscar"
                            placeholder="Buscar"
                            id="buscar"
                            aria-label="Search"
                            required/>
                            <div class="icon-container">
                                <i class="loader_m" ></i>
                            </div>                      
                    </div>
                </div>
            </div>
        </header>

        <div class="wrapper">
            <!-- barra lateral -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3 type='button' onclick="nav_bar()">Bsale Test</h3>
                </div>
                <!-- Menu opticiones-->
                <ul class="list-unstyled components">
                    <li>
                        <a id="filter_now" href="#pageSubmenu" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">Filtros</a>
                        <ul class="list-unstyled collapse show" id="pageSubmenu">
                            <li>
                                <a onclick="categories(0,0,0,'NAME_ASC')" id="NAME_ASC" class="dropdown-item d-flex gap-2 align-items-center" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                        <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                    </svg>
                                    Nombre: A-Z
                                </a>
                            </li>
                            <li>
                                <a onclick="categories(0,0,0,'NAME_DESC')" id="NAME_DESC" class="dropdown-item d-flex gap-2 align-items-center" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                                        <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
                                        <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
                                        <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                    </svg>
                                    Nombre: Z-A
                                </a>
                            </li>
                            <li>
                                <a onclick="categories(0,0,0,'PRICE_DESC')" id="PRICE_DESC" class="dropdown-item d-flex gap-2 align-items-center" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                        <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                    </svg>
                                    De mayor a menor precio
                                </a>
                            </li>
                            <li>
                                <a onclick="categories(0,0,0,'PRICE_ASC')" id="PRICE_ASC" class="dropdown-item d-flex gap-2 align-items-center" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-up-alt" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                        <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                                    </svg>
                                    De menor a mayor precio
                                </a>
                            </li>
                        </ul>
                    </li>
                    <h3>Categorias</h3>
                    <!-- categorias de los productos -->
                    <li id="categories">
                        <!-- categorias creados desde javascript -->
                    </li>
                </ul>
            </nav>

            <!-- Page Content -->
            <div id="content" >
                <!-- imagen css de barra lateral -->
                <div class="col">
                    <div type="Button" onclick="animation_menu(this)" class="menu_icon">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                </div>

                <!-- cabezera de informacion sobre pagina actual, categoria y filtro -->
                <div class="row info-filter-header">
                    <div class="col">
                        <p id="number-pagination" class="link-secondary text-center" >Pagina actual: </p>
                    </div>
                    <div class="col">
                        <p id="filters" class="link-secondary text-center" >Categoria: Ninguno | Filtro: Ninguno</p>
                    </div>
                </div>

                <!-- contenedor de las cartas -->
                <div id="container" class="container row m-auto">
                    <!-- cartas ceradas por javascript -->
                </div>

                <!-- paginación -->
                <div class="pagination justify-content-center mt-5">
                    <ul> <!-- numero de paginas por javascript --> </ul>
                </div>
            </div>


        </div>
    </body>
</html>
