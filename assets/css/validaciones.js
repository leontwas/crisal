document.addEventListener("DOMContentLoaded", function () {
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

        // Validar nombre
        if (nombre === "") {
            alert("Por favor, introduce tu nombre");
            event.preventDefault();
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("Solo se permiten letras y espacios en el nombre.");
            event.preventDefault();
            return;
        }

        // Validar apellido
        if (apellido === "") {
            alert("Por favor, introduce tu apellido");
            event.preventDefault();
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            alert("Solo se permiten letras y espacios en el apellido.");
            event.preventDefault();
            return;
        }

        // Validar teléfono
        if (telefono === "") {
            alert("Por favor, introduce tu teléfono");
            event.preventDefault();
            return;
        } else if (!/^\d{10}$/.test(telefono)) {
            alert("El teléfono debe contener 10 dígitos numéricos.");
            event.preventDefault();
            return;
        }

        // Validar correo electrónico
        if (email === "") {
            alert("Por favor, introduce tu correo electrónico");
            event.preventDefault();
            return;
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
            event.preventDefault();
            return;
        }

        // Validar fecha
        if (fecha === "") {
            alert("Por favor, selecciona una fecha.");
            event.preventDefault();
            return;
        }
    }

    // Asociar la función de validación al evento submit
    formulario.addEventListener("submit", validarFormulario);
});
