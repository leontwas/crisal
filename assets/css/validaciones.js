document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos del formulario
    var formulario = document.getElementById("formulario");
    var nombreInput = document.getElementById("nombre");
    var apellidoInput = document.getElementById("apellido");
    var telefonoInput = document.getElementById("telefono");
    var emailInput = document.getElementById("email");
    var fechaInput = document.getElementById("fecha");

    // Función de validación general
    function validarFormulario(event) {
        var nombre = nombreInput.value.trim();
        var apellido = apellidoInput.value.trim();
        var telefono = telefonoInput.value.trim();
        var email = emailInput.value.trim();
        var fecha = fechaInput.value.trim();

        if (nombre === "") {
            alert("Por favor, introduce tu nombre");
            event.preventDefault();
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("Solo se permiten letras y espacios en el nombre.");
            event.preventDefault();
            return;
        }

        if (apellido === "") {
            alert("Por favor, introduce tu apellido");
            event.preventDefault();
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            alert("Solo se permiten letras y espacios en el apellido.");
            event.preventDefault();
            return;
        }

        if (telefono === "") {
            alert("Por favor, introduce tu teléfono");
            event.preventDefault();
            return;
        } else if (!/^\d+$/.test(telefono)) {
            alert("Solo se permiten números en el teléfono.");
            event.preventDefault();
            return;
        }

        if (email === "" || !/^[^\s@]+@[^\s@]+\.(com|us|ar|museum|uk|de|jp|fr|cn|br|es|au|org|net|edu|gov|mil)$/i.test(email)) {
            alert("Por favor, introduce un email válido");
            event.preventDefault();
            return;
        }

        var fechaSeleccionada = new Date(fecha);
        var fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a cero para comparación
        if (fecha === "" || fechaSeleccionada < fechaActual) {
            alert("La fecha no puede ser anterior a la fecha actual.");
            event.preventDefault();
            return;
        } else {
            var fechaMaxima = new Date();
            fechaMaxima.setMonth(fechaMaxima.getMonth() + 2);
            if (fechaSeleccionada > fechaMaxima) {
                alert("La reserva solo puede realizarse con un máximo de dos meses de anticipación.");
                event.preventDefault();
                return;
            }
        }
    }

    // Añadir el evento submit al formulario
    formulario.addEventListener("submit", validarFormulario);

    // Validaciones en tiempo real
    nombreInput.addEventListener("blur", function() {
        if (!/^[a-zA-Z\s]+$/.test(nombreInput.value)) {
            nombreInput.setCustomValidity("Solo se permiten letras y espacios en el nombre.");
        } else {
            nombreInput.setCustomValidity("");
        }
    });

    apellidoInput.addEventListener("blur", function() {
        if (!/^[a-zA-Z\s]+$/.test(apellidoInput.value)) {
            apellidoInput.setCustomValidity("Solo se permiten letras y espacios en el apellido.");
        } else {
            apellidoInput.setCustomValidity("");
        }
    });

    telefonoInput.addEventListener("keyup", function() {
        if (!/^\d+$/.test(telefonoInput.value)) {
            telefonoInput.setCustomValidity("Solo se permiten números en el teléfono.");
        } else {
            telefonoInput.setCustomValidity("");
        }
    });

    emailInput.addEventListener("blur", function() {
        var email = emailInput.value;
        var pattern = /^[^\s@]+@[^\s@]+\.(com|us|ar|museum|uk|de|jp|fr|cn|br|es|au|org|net|edu|gov|mil)$/i;
        if (!pattern.test(email)) {
            emailInput.setCustomValidity("Por favor, ingresa una dirección de correo electrónico válida");
        } else {
            emailInput.setCustomValidity("");
        }
    });

    fechaInput.addEventListener("blur", function() {
        var fechaSeleccionada = new Date(fechaInput.value);
        var fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a cero para comparación
        if (fechaSeleccionada < fechaActual) {
            fechaInput.setCustomValidity("La fecha no puede ser anterior a la fecha actual.");
        } else {
            var fechaMaxima = new Date();
            fechaMaxima.setMonth(fechaMaxima.getMonth() + 2);
            if (fechaSeleccionada > fechaMaxima) {
                fechaInput.setCustomValidity("La reserva solo puede realizarse con un máximo de dos meses de anticipación.");
            } else {
                fechaInput.setCustomValidity("");
            }
        }
    });

    cantPersSelect.addEventListener("blur", function() {
        if (cantPersSelect.value === "0") {
            cantPersSelect.setCustomValidity("Debe seleccionar al menos una persona.");
        } else {
            cantPersSelect.setCustomValidity("");
        }
    });
});
