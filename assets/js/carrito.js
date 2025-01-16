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

    /**
     * Agregar un producto al carrito
     * Si el producto ya existe, aumenta su cantidad. Si no, lo agrega con cantidad inicial de 1.
     * @param {string} nombre - Nombre del producto.
     * @param {number} precio - Precio del producto.
     */
    function agregarAlCarrito(nombre, precio) {
        const id = idsProductos[nombre]; // Obtener el ID del producto basado en su nombre

        if (id !== undefined) {
            const productoExistente = carrito.find(producto => producto.id === id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                const producto = { id, nombre, precio, cantidad: 1 };
                carrito.push(producto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`${nombre} ha sido agregado al carrito.`);
        } else {
            alert(`El producto "${nombre}" no tiene un ID asignado y no puede ser agregado al carrito.`);
        }
    }

    /**
     * Renderizar el contenido del carrito en la página
     * Actualiza la lista de productos y el total a pagar.
     */
    function renderCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        const totalContainer = document.getElementById('total-pagar');

        carritoContainer.innerHTML = ''; // Limpiar el contenedor
        let totalAPagar = 0;

        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;

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
            totalAPagar += subtotal;
        });

        totalContainer.textContent = `Total a pagar: $${totalAPagar}`;
    }

    /**
     * Eliminar una unidad de un producto del carrito
     * Si la cantidad del producto llega a 0, se elimina completamente del carrito.
     * @param {number} id - ID del producto.
     */
    function eliminarProducto(id) {
        const producto = carrito.find(producto => producto.id === id);

        if (producto) {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito = carrito.filter(producto => producto.id !== id);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    }

    /**
     * Agregar una unidad más de un producto al carrito
     * @param {number} id - ID del producto.
     */
    function agregarMasProducto(id) {
        const producto = carrito.find(producto => producto.id === id);

        if (producto) {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    }

    /**
     * Finalizar la compra
     * Calcula el total a pagar, envía los datos a un servidor y limpia el carrito.
     */
    function finalizarCompra() {
        if (carrito.length === 0) {
            alert('Su carrito está vacío');
            return;
        }

        const totalAPagar = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

        // Formatear los productos en un texto legible
        const productos = carrito.map(producto => 
            `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio}, Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}`
        ).join('\n');

        // Crear un texto con el resumen de la compra
        const datos = {
            productos: productos,
            total: `Total a pagar: $${totalAPagar.toFixed(2)}`
        };

        // Enviar los datos al servidor
        fetch('https://formspree.io/f/meoqebwy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            alert('Compra finalizada con éxito.');
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        })
        .catch(error => {
            alert('Hubo un error al finalizar la compra. Intenta nuevamente.');
        });
    }

    // Asignar eventos a botones
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));

            if (nombre && !isNaN(precio)) {
                agregarAlCarrito(nombre, precio);
            } else {
                alert('El nombre o el precio del producto no son válidos.');
            }
        });
    });

    document.getElementById('carrito-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            eliminarProducto(id);
        }

        if (event.target.classList.contains('agregar-mas')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            agregarMasProducto(id);
        }
    });

    document.getElementById('finalizar-btn').addEventListener('click', finalizarCompra);

    // Renderizar el carrito al cargar la página
    renderCarrito();
});
