document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones para agregar al carrito
    const botonesAgregar = document.querySelectorAll('.agregar');

    // Inicializar el carrito desde localStorage o como un arreglo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Definir los IDs y las imágenes para cada producto según su nombre
    const datosProductos = {
        'Chalecos Refractarios': { id: 1, imagen: './assets/images/chaleco.webp' },
        'Cascos de seguridad':   { id: 2, imagen: './assets/images/cascos.webp' },
        'Libro del Lic. Altamirano': { id: 3, imagen: './assets/images/libro3D.webp' },
        'Arnés de seguridad':    { id: 4, imagen: './assets/images/arnes.webp' },
        'Protectores Auditivos': { id: 5, imagen: './assets/images/auriculares.webp' },
        'Protectores Visuales':  { id: 6, imagen: './assets/images/lentes.webp' },
        'Guantes de seguridad':  { id: 7, imagen: './assets/images/guantes.webp' },
        'Borcegos con punta de acero': { id: 8, imagen: './assets/images/borcegos.webp' },
    };

    // Agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const datos = datosProductos[nombre];

        if (datos !== undefined) {
            const productoExistente = carrito.find(producto => producto.id === datos.id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                const producto = {
                    id: datos.id,
                    nombre,
                    precio,
                    cantidad: 1,
                    imagen: datos.imagen
                };
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

        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<div class="carrito-vacio"><i class="fa-solid fa-cart-shopping" style="font-size: 2rem; margin-bottom: 1rem; display: block; opacity: 0.4;"></i>Tu carrito está vacío</div>';
            totalContainer.textContent = '0';
            return;
        }

        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            const imagenSrc = producto.imagen || '';

            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto');
            productoElemento.innerHTML = `
                ${imagenSrc ? `<img src="${imagenSrc}" alt="${producto.nombre}" class="producto-thumb">` : ''}
                <div class="producto-info">
                    <h5>${producto.nombre}</h5>
                    <p>Precio: $${producto.precio.toLocaleString('es-AR')}</p>
                    <p class="subtotal-text">Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
                </div>
                <div class="producto-acciones">
                    <div class="cantidad-control">
                        <button class="btn-qty quitar-uno" data-id="${producto.id}" aria-label="Quitar uno">−</button>
                        <span class="cantidad-display">${producto.cantidad}</span>
                        <button class="btn-qty agregar-mas" data-id="${producto.id}" aria-label="Agregar uno">+</button>
                    </div>
                    <button class="eliminar" data-id="${producto.id}" title="Quitar del carrito"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `;

            carritoContainer.appendChild(productoElemento);
            totalAPagar += subtotal;
        });

        totalContainer.textContent = totalAPagar.toLocaleString('es-AR');
    }

    // Quitar una unidad de un producto del carrito
    function quitarUnoProducto(id) {
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

    // Eliminar un producto completo del carrito
    function eliminarProducto(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
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
        const btn = event.target.closest('button');
        if (!btn) return;

        const id = parseInt(btn.getAttribute('data-id'));
        if (isNaN(id)) return;

        if (btn.classList.contains('eliminar')) {
            eliminarProducto(id);
        } else if (btn.classList.contains('quitar-uno')) {
            quitarUnoProducto(id);
        } else if (btn.classList.contains('agregar-mas')) {
            agregarMasProducto(id);
        }
    });

    document.getElementById('finalizar-btn').addEventListener('click', () => {
        // Invocar la función finalizarCompra
        finalizarCompra();
    });

    renderCarrito();
});