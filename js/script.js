// Array de productos
let productos = [
    {
        id: 1,
        producto: "Malliot Jumbo Visma - Tour de Francia 2023 The Vélodrome Collection",
        categoria: "malliot_hombres",
        talla: "S-M-L-Xl",
        precio: 55,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/1984393/Tourshirt-mannen-1.webp",
    },
    {
        id: 2,
        producto: "Malliot Jumbo Visma",
        categoria: "malliot_hombres",
        talla: "S-M-L-Xl",
        precio: 45,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/1636519/49035600_main_01.webp",
    },
    {
        id: 3,
        producto: "Malliot Amarillo Tour de Francia 2023 - Jonas Vingegard - Jumbo Visma",
        categoria: "malliot_hombres",
        talla: "S-M-L-Xl",
        precio: 60,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/2064080/TM9440023TDELDER_GI_CLOSEUP01_2023-07-17-154526_zyzb.webp",
    },
    {
        id: 4,
        producto: "Malliot UAE Team Emirates",
        categoria: "malliot_hombres",
        talla: "S-M-L-Xl",
        precio: 70,
        rutaImagen: "https://www.pissei.com/upload/articoli/dettaglio/MAGLIA-MANICHE-CORTE-UFFICIALE-UAE-TEAM-EMIRATES-PISSEI_642_dettaglio@2x.jpg",
    },
    {
        id: 5,
        producto: "Calcetines UAE Team Emirates",
        categoria: "accesorios",
        talla: "S/M-L/Xl",
        precio: 30,
        rutaImagen: "https://www.pissei.com/upload/articoli/dettaglio/CALZINO-UAE-TEAM-EMIRATES-PISSEI_912_dettaglio@2x.jpg",
    },
    {
        id: 6,
        producto: "Cap UAE Team Emirates",
        categoria: "accesorios",
        talla: "Unica",
        precio: 25,
        rutaImagen: "https://www.pissei.com/upload/articoli/dettaglio/CAPPELLINO-UAE-TEAM-EMIRATES-PISSEI_638_dettaglio@2x.jpg",
    },
    {
        id: 7,
        producto: "Culotte UAE Team Emirates Mujer",
        categoria: "culotte",
        talla: "S-M-L-Xl",
        precio: 100,
        rutaImagen: "https://www.pissei.com/upload/articoli/dettaglio/PANTALONCINO-CORTO-DONNA-REPLICA-UAE-TEAM-ADQ-PISSEI_634_dettaglio@2x.jpg",
    },
    {
        id: 4,
        producto: "Malliot UAE Team Emirates Mujer",
        categoria: "malliot_mujeres",
        talla: "S-M-L-Xl",
        precio: 85,
        rutaImagen: "https://www.pissei.com/upload/articoli/dettaglio/MAGLIA-MANICHE-CORTE-DONNA-REPLICA-UAE-TEAM-ADQ-PISSEI_635_dettaglio@2x.jpg",
    },
];

// Array de euipos
let equipos = [
    {
        equipo: "Team Jumbo Visma",
        rutaImagen: "https://c7r2q8r6.stackpathcdn.com/wp-content/uploads/2020/02/Jumbo-Visma-2020-e1582639668174.jpg"
    },
    {
        equipo: "Team UAE Emirates",
        rutaImagen: "https://i.eurosport.com/2021/07/02/3165848-64872415-1600-900.jpg"
    },
    {
        equipo: "Team Lidl - Trek",
        rutaImagen: "https://media.trekbikes.com/image/upload/w_1920,c_fill,f_auto,fl_progressive:semi,q_auto/TK23-Lidl-Trek-Team-Apparel-Launch-Update-Marquee-2"
    },
    {
        equipo: "Team Bora - Hansgrohe",
        rutaImagen: "https://th.bing.com/th/id/R.c58d2c2e3ab2f3b53384b95223e375f8?rik=%2fcNN5dqrMQY7Pg&pid=ImgRaw&r=0"
    },
    {
        equipo: "Team Soudal - Quick Step",
        rutaImagen: "https://discover.garmin.com/pros/img/soudal-quick-step-gallery-01.jpg"
    },
    {
        equipo: "Team Ineos",
        rutaImagen: "https://discover.garmin.com/pros/img/ineos-grenadiers-cycling-team-gallery-01.jpg"
    },
]

// Función para renderizar los productos
function renderizarProductos(productos) {
    const contenedor = document.getElementById("contenedorProductos");

    if (!contenedor) {
        console.error("El contenedor de productos no se encontró en el HTML.");
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const articulo = document.createElement("div");
        articulo.classList.add("card");
        articulo.innerHTML = `
            <img class="card-img-top" src="${producto.rutaImagen}" alt="${producto.producto}">
            <div class="card-body">
                <h5 class="card-title">${producto.producto}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <p class="card-text">Tallas Disponibles: ${producto.talla}</p>
                <a href="#" class="btn btn-primary"><button class="agregar-al-carrito btn btn-primary" data-id="${producto.id}">Agregar al carrito</button></a>
            </div>`;
        contenedor.appendChild(articulo);
    });
}

renderizarProductos(productos);

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        console.error("Producto no encontrado.");
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.producto,
            precio: producto.precio,
            cantidad: 1,
            rutaImagen: producto.rutaImagen,
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-al-carrito")) {
        const productoId = parseInt(event.target.dataset.id);
        agregarAlCarrito(productoId);
    }
});

// Función para renderizar el carrito en la página
function renderizarCarrito() {
    const divCarrito = document.getElementById("carrito");

    divCarrito.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        let total = 0;

        carrito.forEach((productoEnCarrito) => {
            const tarjetaCarrito = document.createElement("div");
            tarjetaCarrito.classList.add("carrito-item");

            const subtotal = productoEnCarrito.precio * productoEnCarrito.cantidad;
            total += subtotal;

            tarjetaCarrito.innerHTML = `
                <img class="imagenProductoCarrito" src="${productoEnCarrito.rutaImagen}" alt="${productoEnCarrito.nombre}">
                <h3>${productoEnCarrito.nombre}</h3>
                <p>Precio: $${productoEnCarrito.precio}</p>
                <p>Cantidad: ${productoEnCarrito.cantidad}</p>
                <p>Subtotal: $${subtotal}</p>`;

            divCarrito.appendChild(tarjetaCarrito);
        });

        const totalCompra = document.createElement("div");
        totalCompra.classList.add("estiloTotal");
        totalCompra.innerHTML = `Total a pagar: $${total}`;
        divCarrito.appendChild(totalCompra);

        const botonFinalizarCompra = document.createElement("button");
        botonFinalizarCompra.innerHTML = "Finalizar compra";
        botonFinalizarCompra.addEventListener("click", finalizarCompra);
        divCarrito.appendChild(botonFinalizarCompra);
    } else {
        const mensajeCarritoVacio = document.createElement("p");
        mensajeCarritoVacio.textContent = "No hay productos en el carrito";
        divCarrito.appendChild(mensajeCarritoVacio);
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    const carrito = document.getElementById("carrito");
    carrito.innerHTML = "No hay productos en el carrito";
    localStorage.removeItem("carrito");
    alert("Compra realizada con éxito!");
    verOcultarCarrito();
}

// Función para ver u ocultar el carrito
function verOcultarCarrito() {
    const carrito = document.getElementById("carrito");
    const contenedorProductos = document.getElementById("contenedorProductos");
    carrito.classList.toggle("oculta");
    contenedorProductos.classList.toggle("oculta");
}

const verOcultarCarritoButton = document.getElementById("verOcultarCarritoButton");

verOcultarCarritoButton.addEventListener("click", () => {
    verOcultarCarrito();
});

// Función para recargar la página
const botonRecarga = document.getElementById("recarga");
botonRecarga.addEventListener("click", () => {
    location.reload();
});

// Obtén referencias al input y al botón de búsqueda
let buscador = document.getElementById("buscador");
let botonBuscar = document.getElementById("buscar");

// Agrega un evento al botón de búsqueda para realizar el filtrado
botonBuscar.addEventListener("click", () => filtrarProductos(productos));

// Función para filtrar los productos según botones
function filtrarProductos(productos) {
    const textoBusqueda = buscador.value.trim().toUpperCase();

    const productosFiltrados = productos.filter(producto => {
        return producto.producto.toUpperCase().includes(textoBusqueda);
    });

    renderizarProductos(productosFiltrados);
}

const botonesCategoria = document.querySelectorAll(".filtroCategoria");

// Agrega un evento click a cada botón de categoría
botonesCategoria.forEach(boton => {
    boton.addEventListener("click", () => {
        const categoriaSeleccionada = boton.getAttribute("data-categoria");
        // Filtra los productos según la categoría seleccionada
        const productosFiltrados = productos.filter(producto => {
            return producto.categoria === categoriaSeleccionada;
        });
        // Renderiza los productos filtrados
        renderizarProductos(productosFiltrados);
    });
});

// Carrusel con productos alertorios

function generarEquiposAleatorios(equipos, cantidad) {
    const equiposAleatorios = [];
    const copiaEquipos = [...equipos];

    for (let i = 0; i < cantidad; i++) {
        if (copiaEquipos.length === 0) {
            break; // Evita un bucle infinito si se solicitan más productos de los disponibles
        }

        const indiceAleatorio = Math.floor(Math.random() * copiaEquipos.length);
        const equipoAleatorio = copiaEquipos.splice(indiceAleatorio, 1)[0];
        equiposAleatorios.push(equipoAleatorio);
    }

    return equiposAleatorios;
}

// Genera una lista de 3 productos aleatorios para el carrusel
const equiposAleatorios = generarEquiposAleatorios(equipos, 3);

// Referencias a elementos del carrusel
const carouselIndicators = document.querySelector(".carousel-indicators");
const carouselInner = document.querySelector(".carousel-inner");

// Itera sobre los productos aleatorios y crea los elementos del carrusel
equiposAleatorios.forEach((equipos, index) => {
    // Crea un indicador
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
    indicator.setAttribute("data-bs-slide-to", index.toString());
    if (index === 0) {
        indicator.classList.add("active");
    }
    carouselIndicators.appendChild(indicator);

    // Crea un elemento de carrusel
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
        carouselItem.classList.add("active");
    }

    // Agrega la imagen y título del producto al elemento de carrusel
    carouselItem.innerHTML = `
        <img src="${equipos.rutaImagen}" class="d-block w-100" alt="${equipos.equipo}">
        <div class="carousel-caption d-none d-md-block">
            <h5>${equipos.equipo}</h5>
        </div>
    `;

    carouselInner.appendChild(carouselItem);
});
