// Array de productos
let productos = [
    {
        id: 1,
        producto: "Malliot Jumbo Visma - Tour de Francia 2023 The Vélodrome Collection",
        categoria: "malliot_hombres",
        Talla: "S-M-L-Xl",
        precio: 55,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/1984393/Tourshirt-mannen-1.webp",
    },
    {
        id: 2,
        producto: "Malliot Jumbo Visma",
        categoria: "malliot_hombres",
        Talla: "S-M-L-Xl",
        precio: 45,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/1636519/49035600_main_01.webp",
    },
    {
        id: 3,
        producto: "Malliot Amarillo Tour de Francia 2023 - Jonas Vingegard - Jumbo Visma",
        categoria: "malliot_hombres",
        Talla: "S-M-L-Xl",
        precio: 45,
        rutaImagen: "https://dvy7d3tlxdpkf.cloudfront.net/team-jumbo/_1755xAUTO_resize_center-center_85_none/2064080/TM9440023TDELDER_GI_CLOSEUP01_2023-07-17-154526_zyzb.webp",
    },
];

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
        articulo.classList.add("articulo");
        articulo.innerHTML = `
            <h3>${producto.producto}</h3>
            <img class="imagenProducto" src="${producto.rutaImagen}" alt="${producto.producto}">
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-al-carrito" data-id="${producto.id}">Agregar al carrito</button>`;
        contenedor.appendChild(articulo);
    });
}

// Llama a la función para renderizar los productos
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

// Escucha el evento clic en los botones "Agregar al carrito"
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

// Obtén una referencia al botón de ver/ocultar el carrito
const verOcultarCarritoButton = document.getElementById("verOcultarCarritoButton");

// Agrega un controlador de eventos al botón
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

// Función para filtrar los productos
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