// Seleccionamos todos los elementos con la clase 'col'
const cols = document.querySelectorAll('.col');

// Agregamos el evento 'touchstart' a cada uno de los elementos
cols.forEach(col => {
    col.addEventListener('touchstart', function() {
        this.classList.toggle('hover');
    });
});