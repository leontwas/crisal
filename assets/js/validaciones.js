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

    // Validación del nombre
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

    // Validación del apellido
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

    // Validación del teléfono
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

    // Validación del correo electrónico
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

    // Validación de la fecha
    function validarFecha() {
        var fechaSeleccionada = new Date(fechaInput.value);
        var fechaActual = new Date();
        var tresMesesAdelante = new Date();
        tresMesesAdelante.setMonth(fechaActual.getMonth() + 3);

        // Eliminar la hora para comparar solo fechas
        fechaActual.setHours(0, 0, 0, 0);
        tresMesesAdelante.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            mostrarError(fechaInput, "La fecha no puede ser anterior a la fecha actual.");
            fechaInput.value = ""; // Limpia el campo
        } else if (fechaSeleccionada > tresMesesAdelante) {
            mostrarError(fechaInput, "La fecha no puede ser mayor a 3 meses desde hoy.");
            fechaInput.value = ""; // Limpia el campo
        } else {
            fechaInput.setCustomValidity("");
        }
    }

    // Asociar validaciones en eventos de input y blur
    nombreInput.addEventListener("input", validarNombre);
    nombreInput.addEventListener("blur", validarNombre);

    apellidoInput.addEventListener("input", validarApellido);
    apellidoInput.addEventListener("blur", validarApellido);

    telefonoInput.addEventListener("input", validarTelefono);
    telefonoInput.addEventListener("blur", validarTelefono);

    emailInput.addEventListener("input", validarEmail);
    emailInput.addEventListener("blur", validarEmail);

    fechaInput.addEventListener("input", validarFecha);
    fechaInput.addEventListener("blur", validarFecha);

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
        }
    });
});
