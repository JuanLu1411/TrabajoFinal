document.addEventListener("DOMContentLoaded", function () {
    var audi = document.getElementById("au");
    audi.play();
});

$(document).ready(function () {
    $('#modosDeJuegoCarousel').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // Obtén todas las diapositivas del carrusel
    const carouselSlides = document.querySelectorAll('.carousel-slide');

    // Agrega un evento click a cada diapositiva
    carouselSlides.forEach((slide) => {
        slide.addEventListener('click', () => {
            // Obtén el índice de la diapositiva haciendo referencia al atributo data-index
            const index = slide.dataset.index;

            // Navega a la diapositiva correspondiente al índice utilizando el método slickGoTo
            $('#modosDeJuegoCarousel').slick('slickGoTo', index);
        });
    });

    $('#modosDeJuegoCarousel').on('afterChange', function (event, slick, currentSlide) {
        const backgroundColors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(128, 128, 128, 0.5)', 'rgba(255, 165, 0, 0.5)'];
        const body = document.body;
        const backgroundColor = backgroundColors[currentSlide];

        // Aplica una transición de fundido al color de fondo del body
        $(body).fadeOut(250, function () {
            body.style.backgroundColor = backgroundColor;
            $(this).fadeIn(250);
        });
    });
});