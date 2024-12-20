document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones para agregar al carrito
    const botonesAgregar = document.querySelectorAll('.agregar');
  
    // Inicializar el carrito desde localStorage o como un arreglo vacío
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
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
        const id = idsProductos[nombre] || null;

        if (id !== null) {
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
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`${nombre} ha sido agregado al carrito.`);
        } else {
            alert(`El producto "${nombre}" no tiene un ID asignado y no puede ser agregado al carrito.`);
        }
    }

    // Asignar evento click a cada botón
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const articulo = boton.parentElement;
            const nombre = articulo.querySelector('h2, h5').textContent;
            const precioTexto = articulo.querySelector('.description').textContent;
            const precio = parseFloat(
                precioTexto
                    .replace('Precio $', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            );
            agregarAlCarrito(nombre, precio);
        });
    });

    // Referencias al contenedor de productos y total
    const carritoContainer = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total-pagar');
    const verCarritoBtn = document.querySelector('.btn-primary');  // Botón "Ver mi Carrito"

    // Función para actualizar la vista del carrito
    function renderCarrito() {
        carritoContainer.innerHTML = ''; // Limpiar el contenedor

        let totalAPagar = 0;

        // Agrupar productos por ID
        const productosAgrupados = carrito.reduce((acc, producto) => {
            if (!acc[producto.id]) {
                acc[producto.id] = { ...producto };
            } else {
                acc[producto.id].cantidad += producto.cantidad;
            }
            return acc;
        }, {});

        // Mostrar productos agrupados
        Object.values(productosAgrupados).forEach((producto) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            productoDiv.innerHTML = `
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            `;

            carritoContainer.appendChild(productoDiv);

            // Acumular el total
            totalAPagar += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        totalContainer.textContent = totalAPagar.toFixed(2);
    }

    // Función para eliminar un producto del carrito (disminuir la cantidad)
    function eliminarProducto(id) {
        const productoExistente = carrito.find(producto => producto.id === id);
        if (productoExistente) {
            if (productoExistente.cantidad > 1) {
                productoExistente.cantidad--;  // Disminuir la cantidad en 1
            } else {
                const index = carrito.findIndex(producto => producto.id === id);
                carrito.splice(index, 1);  // Eliminar el producto si la cantidad es 1
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito(); // Volver a renderizar el carrito
        }
    }

    // Evento para eliminar producto al hacer clic en el botón de eliminar
    carritoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            eliminarProducto(id);
        }
    });

    // Evento para finalizar la compra
    const finalizarBtn = document.getElementById('finalizar-btn');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío.');
                return;
            }

            const totalAPagar = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
            alert(`¡Gracias por tu compra! El total a pagar es $${totalAPagar.toFixed(2)}.`);
            localStorage.removeItem('carrito'); // Limpiar el carrito
            renderCarrito(); // Volver a renderizar el carrito vacío
        });
    } else {
        console.warn('El botón de finalizar compra no se encontró.');
    }

    // Evento para mostrar un alert al hacer clic en el botón "Ver mi Carrito"
    if (verCarritoBtn) {
        verCarritoBtn.addEventListener('click', () => {
            alert('¡Has agregado un producto al carrito!');
        });
    }

    // Renderizar el carrito inicialmente
    renderCarrito();
});
