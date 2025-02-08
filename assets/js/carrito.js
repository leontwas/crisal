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

    // Agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const id = idsProductos[nombre];

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

    // Renderizar el contenido del carrito
    function renderCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        const totalContainer = document.getElementById('total-pagar');

        carritoContainer.innerHTML = '';
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

        totalContainer.textContent = `${totalAPagar}`;
    }

    // Eliminar una unidad de un producto del carrito
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

    // Agregar una unidad más de un producto al carrito
    function agregarMasProducto(id) {
        const producto = carrito.find(producto => producto.id === id);

        if (producto) {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    }

// Finalizar la compra
function finalizarCompra() {
    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Validar si el carrito está vacío
    if (carrito.length === 0) {
        alert('Su carrito está vacío. Por favor, agregue productos antes de proceder.');
        return;
    }

    // Calcular el total a pagar
    const totalAPagar = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

    // Crear la lista de productos en el carrito
    const productos = carrito.map(producto => 
        `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio}, Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}`
    ).join('\n');

    // Guardar los datos del carrito y el total en localStorage
    localStorage.setItem('productos', productos); // Guardar la lista de productos como una cadena
    localStorage.setItem('total', totalAPagar.toFixed(2)); // Guardar el total con dos decimales

    // Mensaje de confirmación
    alert(`El total de su compra es: $${totalAPagar.toFixed(2)}.\n\nProductos:\n${productos}\n\nPor favor, complete sus datos en el formulario.`);

    // Redirigir al formulario de compra
    window.location.href = '../comprar.html';
}


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

    document.getElementById('finalizar-btn').addEventListener('click', () => {
        // Invocar la función finalizarCompra
        finalizarCompra();
    });

    renderCarrito();
});