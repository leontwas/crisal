document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones para agregar al carrito
    const botonesAgregar = document.querySelectorAll('.agregar');

    // Inicializar el carrito desde localStorage o como un arreglo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Definir los IDs para cada producto según su nombre
    const idsProductos = {
        'Chalecos Refractarios': 1,
        'Cascos de seguridad': 2,
        'Libro del Lic. Altamirano': 3,
        'Arnés de seguridad': 4,
        'Protectores Auditivos': 5,
        'Protectores Visuales': 6,
        'Guantes de seguridad': 7,
        'Borcegos con punta de acero': 8,
    };

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const id = idsProductos[nombre];  // Obtener el ID del producto basado en su nombre

        if (id !== undefined) {
            // Buscar si el producto ya está en el carrito
            const productoExistente = carrito.find(producto => producto.id === id);

            if (productoExistente) {
                // Si ya existe, incrementar la cantidad
                productoExistente.cantidad++;
            } else {
                // Si no existe, agregarlo al carrito con cantidad 1
                const producto = { id, nombre, precio, cantidad: 1 };
                carrito.push(producto);
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Avisar con un alert
            alert(`${nombre} ha sido agregado al carrito.`);
        } else {
            alert(`El producto "${nombre}" no tiene un ID asignado y no puede ser agregado al carrito.`);
        }
    }

    // Asignar evento click a cada botón de comprar
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');  // Obtener el nombre del producto
            const precio = parseFloat(boton.getAttribute('data-precio'));  // Obtener el precio del producto

            if (nombre && !isNaN(precio)) {
                agregarAlCarrito(nombre, precio);  // Llamar a la función de agregar al carrito
            } else {
                alert('El nombre o el precio del producto no son válidos.');
            }
        });
    });

    // Referencias al contenedor de productos, total y el botón de finalizar compra
    const carritoContainer = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total-pagar');
    const botonFinalizarCompra = document.getElementById('finalizar-btn');

    // Función para actualizar la vista del carrito
    function renderCarrito() {
        carritoContainer.innerHTML = ''; // Limpiar el contenedor
        let totalAPagar = 0;

        // Agrupar productos por ID (en caso de que haya múltiples productos del mismo tipo)
        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad; // Calcular el subtotal por producto

            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto');
            productoElemento.innerHTML = `
                <h5>${producto.nombre}</h5>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${subtotal}</p>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
                <button class="agregar-mas" data-id="${producto.id}">Agregar Más</button>
            `;
            carritoContainer.appendChild(productoElemento);
            totalAPagar += subtotal; // Acumular los subtotales para el total
        });

        // Mostrar el total
        totalContainer.textContent = `Total a pagar: $${totalAPagar}`;
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }

    // Función para agregar más unidades de un producto al carrito
    function agregarMasProducto(id) {
        const producto = carrito.find(producto => producto.id === id);
        if (producto) {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    }

    // Event listener para el botón de eliminar un producto
    carritoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            eliminarProducto(id);
        }

        if (event.target.classList.contains('agregar-mas')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            agregarMasProducto(id);
        }
    });

    // Función para finalizar la compra
    function finalizarCompra() {
        if (carrito.length === 0) {
            // Si el carrito está vacío, mostrar un mensaje y no continuar con el proceso
            alert('Su carrito está vacío');
            return;
        }

        const totalAPagar = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

        // Mostrar el mensaje con el total a pagar
        alert(`Total a pagar: $${totalAPagar}`);

        // Preparar los datos para enviar
        const productos = carrito.map(producto => ({
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            subtotal: producto.precio * producto.cantidad
        }));

        const datos = {
            productos: JSON.stringify(productos), // Enviar los productos como un string JSON
            total: totalAPagar.toFixed(2) // Enviar el total con 2 decimales
        };

        // Enviar los datos a Formspree mediante una solicitud POST
        fetch('https://formspree.io/f/meoqebwy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Formulario enviado correctamente:', data);
            alert('Compra finalizada con éxito.');
            // Limpiar el carrito después de la compra
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al finalizar la compra. Intenta nuevamente.');
        });
    }

    // Event listener para el botón de finalizar compra
    botonFinalizarCompra.addEventListener('click', finalizarCompra);

    // Renderizar el carrito al cargar la página
    renderCarrito();
});
