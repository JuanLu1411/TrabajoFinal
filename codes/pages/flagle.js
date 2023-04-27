$(document).ready(function () {
    var correctCountry; // Variable para almacenar el país correcto

    // Realizamos la petición a la API para obtener la lista de países
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Petición a la API realizada correctamente");
            // Seleccionamos un país aleatorio
            correctCountry = data[Math.floor(Math.random() * data.length)];
            var correctFlag = correctCountry.flags.png;

            // Agregamos la bandera a la página
            $(".flag-container").append("<img src='" + correctFlag + "'/>");

            // Obtener todos los países y crear un objeto para cada país con su nombre y su bandera
            var allCountries = data.map(country => ({ name: country.name.common, flagUrl: country.flags.png }));

            // Obtener los elementos del DOM
            const select = document.getElementById('countries-select');
            const input = document.getElementById('country-input');

            // Función para actualizar la lista de opciones del select según el valor del input
            function updateSelectOptions() {
                // Obtener el valor actual del input y limpiar los espacios al principio y al final
                const inputText = input.value.trim().toLowerCase();
                // Filtrar los países según el valor del input
                const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(inputText));
                // Crear una lista de opciones de selección de países a partir de los países filtrados
                const selectOptions = filteredCountries.map(country => `<option value="${country.name}">${country.name}</option>`).join('');
                // Agregar las opciones al select
                select.innerHTML = '<option value=""></option>' + selectOptions;
            }

            // Escuchar el evento input del input para actualizar la lista de opciones del select
            input.addEventListener('input', updateSelectOptions);

            // Actualizar la lista de opciones del select al cargar la página
            updateSelectOptions();

            // Escuchamos el evento de cambio del desplegable y del input
            let selectedCountry;
            select.addEventListener('change', function () {
                selectedCountry = select.value;
                if (selectedCountry === correctCountry.name.common) {
                    // Si se selecciona el país correcto, se redirige a otra página
                    window.location.assign("./modosDeJuego.html");
                }
            });
            input.addEventListener('input', function () {
                selectedCountry = input.value.trim();
                if (selectedCountry === correctCountry.name.common) {
                    // Si se escribe el nombre del país correcto, se redirige a otra página
                    window.location.assign("./modosDeJuego.html");
                }
            });
        },
        error: function (error) {
            console.log("Error al realizar la petición a la API");
        }
    });
});
