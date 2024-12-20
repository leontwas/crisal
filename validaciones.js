document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del formulario
    var formulario = document.getElementById("formulario");
    var nombreInput = document.getElementById("nombre");
    var apellidoInput = document.getElementById("apellido");
    var telefonoInput = document.getElementById("telefono");
    var emailInput = document.getElementById("email");
    var fechaInput = document.getElementById("fecha");

    // Validación al salir del campo de nombre
    nombreInput.addEventListener("blur", function () {
        var nombre = nombreInput.value.trim();
        if (nombre === "") {
            alert("El nombre no puede estar vacío.");
        } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("Solo se permiten letras y espacios en el nombre.");
        }
    });

    // Validación al salir del campo de apellido
    apellidoInput.addEventListener("blur", function () {
        var apellido = apellidoInput.value.trim();
        if (apellido === "") {
            alert("El apellido no puede estar vacío.");
        } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            alert("Solo se permiten letras y espacios en el apellido.");
        }
    });

    // Validación al salir del campo de teléfono
    telefonoInput.addEventListener("blur", function () {
        var telefono = telefonoInput.value.trim();
        if (telefono === "") {
            alert("El teléfono no puede estar vacío.");
        } else if (!/^\d{10}$/.test(telefono)) {
            alert("El teléfono debe contener 10 dígitos numéricos.");
        }
    });

    // Validación al salir del campo de correo electrónico
    emailInput.addEventListener("blur", function () {
        var email = emailInput.value.trim();
        var dominiosValidos = [
            "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
            "icloud.com", "aol.com", "protonmail.com"
        ];
        var emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

        if (email === "") {
            alert("El correo electrónico no puede estar vacío.");
        } else if (!emailRegex.test(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
        } else {
            var dominio = email.split("@")[1];
            if (!dominiosValidos.includes(dominio)) {
                alert(`El dominio ${dominio} no es válido. Usa uno de los más populares.`);
            }
        }
    });

    // Validación al salir del campo de fecha
    fechaInput.addEventListener("blur", function () {
        var fechaSeleccionada = new Date(fechaInput.value);
        var fechaActual = new Date();
        var tresMesesAdelante = new Date();
        tresMesesAdelante.setMonth(fechaActual.getMonth() + 3);

        // Eliminar la hora para comparar solo fechas
        fechaActual.setHours(0, 0, 0, 0);
        tresMesesAdelante.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            alert("La fecha no puede ser anterior a la fecha actual.");
            fechaInput.value = ""; // Limpia el campo
        } else if (fechaSeleccionada > tresMesesAdelante) {
            alert("La fecha no puede ser mayor a 3 meses desde hoy.");
            fechaInput.value = ""; // Limpia el campo
        }
    });

    // Evitar el envío del formulario si hay errores
    formulario.addEventListener("submit", function (event) {
        var errores = false;

        // Validar campos antes del envío
        if (
            nombreInput.value.trim() === "" ||
            apellidoInput.value.trim() === "" ||
            telefonoInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            fechaInput.value.trim() === ""
        ) {
            errores = true;
        }

        if (errores) {
            alert("Por favor, corrige los errores antes de enviar el formulario.");
            event.preventDefault();
        }
    });
});
