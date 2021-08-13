// Clase
class Archivos3D {
    constructor(nombre, costoFilamento, valorHora, tiempoImpresion, cantidadMaterial, costoMaterial, costoImpresion, costoTotal, status, bg) {
        this.nombre = nombre;
        this.costoFilamento = costoFilamento;
        this.valorHora = valorHora;
        this.tiempoImpresion = tiempoImpresion;
        this.cantidadMaterial = cantidadMaterial;
        this.costoMaterial = costoMaterial;
        this.costoImpresion = costoImpresion;
        this.costoTotal = costoTotal;
        this.status = status;
        this.bg = bg;
    }
}

// Variables globales
let arrayArchivos = [{
    cantidadMaterial: 80,
    costoImpresion: 360,
    costoMaterial: 84,
    costoTotal: 444,
    nombre: "Robert Plant",
    tiempoImpresion: 9,
    status: "Demo",
    bg: "bg-demo"
}, {
    cantidadMaterial: 280,
    costoImpresion: 1200,
    costoMaterial: 320,
    costoTotal: 1520,
    nombre: "Moon Lamp",
    tiempoImpresion: 30,
    status: "Demo",
    bg: "bg-demo"
}];
let modalEliminar = $('#exampleModal');
let divResultado = $('#form-result');
let divCostos = $('#all-costos');
let btnCalcular = $('#btnCalcular');
let btnLimpiar = $('#limpiar')
let alertNombre = $('#alert-nombre');
let alertcostoFilamento = $('#alert-costoFilamento');
let alertValorHora = $('#alert-valorHora');
let alertTiempoImpresion = $('#alert-tiempoImpresion');
let alertCantidadMaterial = $('#alert-cantidadMaterial');

// Guardando array inicial en el storage o recuperando array de storage.
(function () {
    let storage = localStorage.getItem('impresiones')
    if (!storage) {
        let aJson = JSON.stringify(arrayArchivos)
        localStorage.setItem('impresiones', aJson)
    } else {
        arrayArchivos = JSON.parse(storage)
    }
})();

//Animaciones, Scroll
$(document).ready(function () {

    $(".navbar-nav .nav-link").on("click", function () {
        $(".navbar-nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $('.nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    $('#btnHome').click(function () {
        $('html, body').animate({
            behavior: 'smooth',
            scrollTop: $("#section-form").offset().top
        }, 500);
    });
    $('#btnAdd').click(function () {
        $('html, body').animate({
            behavior: 'smooth',
            scrollTop: $("#section-form").offset().top
        }, 500);
    });
    $('#btnVer').click(function () {
        $('html, body').animate({
            behavior: 'smooth',
            scrollTop: $("#section-all").offset().top
        }, 500);
    });

    $("#navBar").fadeIn(3000);
    $('#navBar').addClass('d-flex', 'align-items-center')
    $("#titleHome").fadeIn(2000);
    $("#pHome").fadeIn(3000);
    $("#btnHome").fadeIn(3200);
    $('#imgHome1').fadeIn(3500)
    $('#imgHome2').fadeIn(3800)
    $('#canvas').fadeIn(2000)
    $("#all-costos").scrollLeft(1800)

    function progresoScroll() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("progresoScroll").style.width = scrolled + "%";
    }

    window.onscroll = function () { progresoScroll() };

    window.addEventListener('scroll', function () {

        let header = $('.header')
        let navBar = $('.navbar')

        if (window.scrollY > 0) {
            header.css('position', 'fixed')
            header.css('box-shadow', 'rgb(49 49 49 / 10%) 0px 5px 15px 5px')
            navBar.css('transition', '.5s')
            navBar.css('animation', '.5s')
            navBar.css('height', '60px')
            navBar.css('background-color', 'rgb(27 27 27 / 86%)')
        } else {
            header.css('position', 'absolute')
            header.css('box-shadow', 'none')
            navBar.css('height', '90px')
            navBar.css('background-color', '#1b1b1b')
        }
    })

});

function scrollToSeccion(sec) {
    $('html, body').animate({
        behavior: 'smooth',
        scrollTop: $(sec).offset().top
    }, 500);
}

function primeraLetraMayusculas(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function calcularPrecioImpresion(valorHora, tiempoImpresion) {
    let precioImpresion = valorHora * tiempoImpresion;
    return precioImpresion
}

function calcularCostoMaterial(costoFilamento, cantidadMaterial) {
    let precioMaterial = costoFilamento / 1000 * cantidadMaterial
    return precioMaterial
}

function ocultarAlertas() {
    alertNombre.addClass('d-none');
    alertcostoFilamento.addClass('d-none');
    alertValorHora.addClass('d-none');
    alertTiempoImpresion.addClass('d-none');
    alertCantidadMaterial.addClass('d-none');
}

function obtenerDatos() {

    ocultarAlertas()

    // Obtenemos los datos del form
    let nombre = $('#nombre').val();
    let costoFilamento = $('#costoFilamento').val();
    let valorHora = $('#valorHora').val();
    let tiempoImpresion = $('#tiempoImpresion').val();
    let cantidadMaterial = $('#cantidadMaterial').val();

    // Comprobamos las entradas de datos
    if (nombre.length == 0) {
        alertNombre.removeClass("d-none");
        return false;
    } if (costoFilamento.length == 0) {
        alertcostoFilamento.removeClass("d-none");
        return false;
    } if (valorHora.length == 0) {
        alertValorHora.removeClass("d-none");
        return false;
    } if (tiempoImpresion.length == 0) {
        alertTiempoImpresion.removeClass("d-none");
        return false;
    } if (cantidadMaterial.length == 0) {
        alertCantidadMaterial.removeClass("d-none");
        return false;
    } else {

        //Conviertiendo las entradas de datos.
        let costoFilamentoParse = parseInt(costoFilamento, 10)
        let valorHoraParse = parseInt(valorHora, 10)
        let tiempoImpresionParse = parseInt(tiempoImpresion, 10)
        let cantidadMaterialParse = parseInt(cantidadMaterial, 10)
        let nombreParse = primeraLetraMayusculas(nombre)

        //Calculos 
        let precioImpresion = calcularPrecioImpresion(valorHoraParse, tiempoImpresionParse);
        let costoMaterial = calcularCostoMaterial(costoFilamentoParse, cantidadMaterialParse);
        let costoTotal = precioImpresion + costoMaterial;

        let precioImpresionParse = parseInt(precioImpresion, 10)
        let costoMaterialParse = parseInt(costoMaterial, 10)
        let costoTotalParse = parseInt(costoTotal, 10)

        //UI
        let status = "Nuevo"
        let bg = "bg-custom"

        //Creando un nuevo objeto en la clase Archivos3d
        const archivo3d = new Archivos3D(nombreParse, costoFilamentoParse, valorHoraParse, tiempoImpresionParse, cantidadMaterialParse, costoMaterialParse, precioImpresionParse, costoTotalParse, status, bg);

        //Push objeto creado en el array
        arrayArchivos.push(archivo3d)

        //Actualizando storage
        let aJson = JSON.stringify(arrayArchivos)
        localStorage.setItem('impresiones', aJson)

        //Desalizando a la seccion de cards
        scrollToSeccion('#section-result')

        //Muestro el ultimo elemndo del array en el html
        mostrarResultado(arrayArchivos)

        //Muestro todos los elemndos del array en el html
        mostrarTodo(arrayArchivos)

        //Reiniciamos el form
        $('input[type="text"]').val('');
        $('input[type="number"]').val('');

        ocultarAlertas()

    }
}

function mostrarResultado(arrayArchivos) {

    const ultimoElemento = arrayArchivos[arrayArchivos.length - 1]
    const card = `
        <div class="card" style="width: 20rem;">
        <img src="https://cdn.dribbble.com/users/482016/screenshots/14974422/media/934923a1b716e5a6b0547b9d95fddaac.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <div class="d-flex card-title-flex"> 
          <h3 class="card-title">${ultimoElemento.nombre}</h3>
          <span class="badge ${ultimoElemento.bg}">${ultimoElemento.status}</span>
        </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="size-span">Tiempo Impresion:</span>  ${ultimoElemento.tiempoImpresion} Horas</li>
            <li class="list-group-item"><span class="size-span">Cantidad de Material:</span>  ${ultimoElemento.cantidadMaterial} Gr</li>
            <li class="list-group-item"><span class="size-span">Costo de Impresion:</span>  $${ultimoElemento.costoImpresion}</li>
            <li class="list-group-item"><span class="size-span">Costo de Material:</span>  $${ultimoElemento.costoMaterial}</li>
            <li class="list-group-item"><span class="size-span">Costo Total:</span><span class="color-span"> $${ultimoElemento.costoTotal}</span></li>
        </ul>
        </div>
        </div>`
    divResultado.fadeOut(500, function () {
        divResultado.html(card).fadeIn(1000);
    })
}

function mostrarTodo(arrayArchivos) {

    divCostos.html('')

    const array = arrayArchivos

    for (let i = 0; i < array.length; i++) {

        divCostos.fadeOut(500, function () {

            divCostos.append(
                `
        <div class="card" style="width: 20rem;">
        <img src="https://cdn.dribbble.com/users/482016/screenshots/14974422/media/934923a1b716e5a6b0547b9d95fddaac.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <div class="d-flex card-title-flex"> 
          <h3 class="card-title">${array[i].nombre}</h3>
          <span class="badge ${array[i].bg}">${array[i].status}</span>
        </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="size-span">Tiempo Impresion:</span>  ${array[i].tiempoImpresion} Horas</li>
            <li class="list-group-item"><span class="size-span">Cantidad de Material:</span>  ${array[i].cantidadMaterial} Gr</li>
            <li class="list-group-item"><span class="size-span">Costo de Impresion:</span>  $${array[i].costoImpresion}</li>
            <li class="list-group-item"><span class="size-span">Costo de Material:</span> $${array[i].costoMaterial}</li>
            <li class="list-group-item"><span class="size-span">Costo Total:</span><span class="color-span"> $${array[i].costoTotal}</span></li>
        </ul>
        </div>
        </div>`
            ).fadeIn(1000);
        })
    }
}

//Libreria externa
function exportarCSV(arrayArchivos) {
    var x = new CSVExport(arrayArchivos);
    return false;
}

function limpiarCostos() {
    let arrayArchivos = [{
        cantidadMaterial: 80,
        costoImpresion: 360,
        costoMaterial: 84,
        costoTotal: 444,
        nombre: "Robert Plant",
        tiempoImpresion: 9,
        status: "Demo",
        bg: "bg-demo"
    }, {
        cantidadMaterial: 280,
        costoImpresion: 1200,
        costoMaterial: 320,
        costoTotal: 1520,
        nombre: "Moon Lamp",
        tiempoImpresion: 30,
        status: "Demo",
        bg: "bg-demo"
    }];

    let aJson = JSON.stringify(arrayArchivos)
    localStorage.setItem('impresiones', aJson)
    modalEliminar.modal('toggle')
    mostrarTodo(arrayArchivos)
}

mostrarResultado(arrayArchivos)
mostrarTodo(arrayArchivos)
btnCalcular.click(obtenerDatos)
btnLimpiar.click(limpiarCostos)
document.getElementById('csv').onclick = function () {
    exportarCSV(arrayArchivos)
}




