document.getElementById("formulario").addEventListener("submit", function(event) {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var fecha = document.getElementById("fecha").value;
    var cantPers = document.getElementById("cantPers").value;

    if (nombre?.trim === "") {
        alert("Por favor, introduce tu nombre");
        event.preventDefault();
    }

    if (!apellido?.trim()) {
        alert("Por favor, introduce tu apellido");
        event.preventDefault();
    }

    if (!telefono?.trim === "") {
        alert("Por favor, introduce tu teléfono");
        event.preventDefault();
    }

    if (email?.trim === "" && !email.includes('@')) {
        alert("Por favor, introduce un email valido");
        event.preventDefault();
    }

    if (fecha?.trim === "") {
        alert("Por favor, selecciona una fecha");
        event.preventDefault();
    }

    if (cantPers?.trim === "") {
        alert("Por favor, selecciona la cantidad de personas");
        event.preventDefault();
    }
});