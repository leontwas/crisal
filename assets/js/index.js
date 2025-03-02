//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 8000; // Tiempo de transición entre slides
let timeAutoNext = 10000; // Tiempo de espera antes de la siguiente transición automática

let runTimeOut;
let runNextAuto;

// Función para mostrar el slider
function showSlider(type, immediate = false) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else if (type === 'prev') {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    } else if (typeof type === 'number') {
        // Si se pasa un índice, mover el slide correspondiente a la primera posición
        for (let i = 0; i < type; i++) {
            SliderDom.appendChild(SliderItemsDom[i]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[i]);
        }
        carouselDom.classList.add('next');
    }

    // Limpiar el timeout actual
    clearTimeout(runTimeOut);
    clearTimeout(runNextAuto);

    // Si no es una transición inmediata, esperar el tiempo de transición
    if (!immediate) {
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);
    } else {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }

    // Reiniciar el timer para la siguiente transición automática
    runNextAuto = setTimeout(() => {
        showSlider('next');
    }, timeAutoNext);
}

// Eventos para los botones next y prev
nextDom.onclick = function () {
    showSlider('next', true); // Transición inmediata
};

prevDom.onclick = function () {
    showSlider('prev', true); // Transición inmediata
};

// Eventos para los thumbnails
thumbnailItemsDom.forEach((thumbnail, index) => {
    // Cambiar el puntero a una mano al pasar el mouse sobre el thumbnail
    thumbnail.style.cursor = 'pointer';

    // Al hacer clic en el thumbnail
    thumbnail.addEventListener('click', () => {
        showSlider(index, true); // Transición inmediata al slide correspondiente
    });
});

// Iniciar la transición automática
runNextAuto = setTimeout(() => {
    showSlider('next');
}, timeAutoNext);