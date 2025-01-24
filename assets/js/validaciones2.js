document.addEventListener("DOMContentLoaded", function () { 
    // Obtener referencias a los elementos del formulario
    var formulario = document.getElementById("formulario");
    var nombreInput = document.getElementById("nombre");
    var apellidoInput = document.getElementById("apellido");
    var telefonoInput = document.getElementById("telefono");
    var emailInput = document.getElementById("email");
    var fechaInput = document.getElementById("fecha");

    // Función genérica para mostrar errores
    function mostrarError(input, mensaje) {
        input.setCustomValidity(mensaje);
        input.reportValidity();
    }

    // Función para obtener la fecha y hora actual
    function obtenerFechaHora() {
        var fechaHora = new Date();
        return fechaHora.toLocaleString(); // Devuelve la fecha y hora en formato local
    }

    // Función para recopilar los productos del carrito
    function obtenerProductosCarrito() {
        // Obtener el carrito desde localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Validar si está vacío
        if (carrito.length === 0) {
            return 'El carrito está vacío';
        }
    
        // Crear una lista con los productos y cantidades del carrito
        return carrito.map(producto => 
            `${producto.nombre} (Cantidad: ${producto.cantidad})`
        ).join(', ');
    }
    
    // Función para agregar productos y fecha y hora al formulario antes de enviarlo
    function agregarDatosAlFormulario() {
        var fechaHora = obtenerFechaHora();
        var productosCarrito = obtenerProductosCarrito();

        // Crear campos ocultos para los productos del carrito y la fecha y hora
        var productosInput = document.createElement("input");
        productosInput.type = "hidden";
        productosInput.name = "productosCarrito"; // El nombre del campo para Formspree
        productosInput.value = productosCarrito;

        var fechaHoraInput = document.createElement("input");
        fechaHoraInput.type = "hidden";
        fechaHoraInput.name = "fechaHoraCompra";  // El nombre del campo para Formspree
        fechaHoraInput.value = fechaHora;

        // Agregar los campos ocultos al formulario
        formulario.appendChild(productosInput);
        formulario.appendChild(fechaHoraInput);
    }

    // Validación de campos
    function validarNombre() {
        var nombre = nombreInput.value.trim();
        if (nombre === "") {
            mostrarError(nombreInput, "El nombre no puede estar vacío.");
        } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            mostrarError(nombreInput, "Solo se permiten letras y espacios en el nombre.");
        } else {
            nombreInput.setCustomValidity("");
        }
    }

    function validarApellido() {
        var apellido = apellidoInput.value.trim();
        if (apellido === "") {
            mostrarError(apellidoInput, "El apellido no puede estar vacío.");
        } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            mostrarError(apellidoInput, "Solo se permiten letras y espacios en el apellido.");
        } else {
            apellidoInput.setCustomValidity("");
        }
    }

    function validarTelefono() {
        var telefono = telefonoInput.value.trim();
        if (telefono === "") {
            mostrarError(telefonoInput, "El teléfono no puede estar vacío.");
        } else if (!/^\d{10}$/.test(telefono)) {
            mostrarError(telefonoInput, "El teléfono debe contener 10 dígitos numéricos.");
        } else {
            telefonoInput.setCustomValidity("");
        }
    }

    function validarEmail() {
        var email = emailInput.value.trim();
        var dominiosValidos = [
         "gmail.com", "yahoo.com.ar", "hotmail.com", "hotmail.com.ar", "outlook.com.ar", "icloud.com.ar", "aol.com.ar", "protonmail.com.ar", 
         "live.com.ar", "msn.com.ar", "zoho.com.ar", "mail.com.ar", "yandex.com.ar", "gmx.com.ar", "mail.ru.ar", "fastmail.com.ar", 
         "tutanota.com.ar", "hushmail.com.ar", "inbox.com.ar", "webmail.com.ar", "mailchimp.com.ar", "mailbox.org.ar", "inbox.lv.ar",
          "hushmail.ca.ar", "rediffmail.in.ar", "seznam.sk.ar"
        ];
        var emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

        if (email === "") {
            mostrarError(emailInput, "El correo electrónico no puede estar vacío.");
        } else if (!emailRegex.test(email)) {
            mostrarError(emailInput, "Por favor, introduce un correo electrónico válido.");
        } else {
            var dominio = email.split("@")[1];
            if (!dominiosValidos.includes(dominio)) {
                mostrarError(emailInput, `El dominio ${dominio} no es válido. Usa uno de los más populares.`);
            } else {
                emailInput.setCustomValidity("");
            }
        }
    }

    function validarFecha() {
        var fecha = fechaInput.value.trim();
        if (fecha === "") {
            mostrarError(fechaInput, "La fecha no puede estar vacía.");
        } else {
            fechaInput.setCustomValidity("");
        }
    }

    // Evitar el envío del formulario si hay errores
    formulario.addEventListener("submit", function (event) {
        // Validar todos los campos antes de enviar
        validarNombre();
        validarApellido();
        validarTelefono();
        validarEmail();
        validarFecha();
    
        if (!formulario.checkValidity()) {
            event.preventDefault();
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        } else {
            // Agregar los productos y fecha de la compra al formulario
            agregarDatosAlFormulario();
    
            // Mostrar mensaje de éxito después de enviar el formulario
            event.preventDefault(); // Evitar el envío real para mostrar el mensaje
            setTimeout(function() {
                alert("Su solicitud ha sido procesada con éxito, el vendedor pronto se contactará con usted para organizar la entrega y el pago.");
                formulario.submit();  // Enviar el formulario después de mostrar el mensaje
                
                // Borrar los datos del carrito en localStorage después de enviar el formulario
                localStorage.removeItem('carrito');
            }, 500);  // Esperar medio segundo antes de mostrar el mensaje
        }
    });

    // Agregar el evento para el botón "Cancelar"
    var botonCancelar = document.getElementById("cancelar"); // Asumiendo que el botón tiene el id "cancelar"
    botonCancelar.addEventListener("click", function () {
        // Borrar los datos del carrito en localStorage
        localStorage.removeItem('carrito');
        
        // Redirigir a la página insumos.html
        window.location.href = "../../insumos.html";
    });
});
