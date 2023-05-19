const firebaseConfig = {
    apiKey: "AIzaSyCC4rz4OeZt8PtnqeZesM84mzO96XhFeAc",
    authDomain: "hit-patriae.firebaseapp.com",
    databaseURL: "https://hit-patriae-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hit-patriae",
    storageBucket: "hit-patriae.appspot.com",
    messagingSenderId: "522944525984",
    appId: "1:522944525984:web:1ab69893e410102c2f7bc5",
    measurementId: "G-7SNJ9NM4SV"
};

const app = firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
const database = firebase.database(app);

$(document).ready(function () {

    function redirectToLogin() {
        window.location.assign("./login.html");
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is authenticated, continue with the game logic

            var correctCountry; // Variable para almacenar el país correcto
            var numErrors = 0; // Variable para llevar el registro de los fallos

            // Obtener el elemento del contador de errores
            const errorCounter = document.getElementById('error-counter');

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
                            // Mostrar notificación de acierto
                            Swal.fire({
                                icon: 'success',
                                title: '¡Correcto!',
                                text: '¡Has adivinado el país!',
                                confirmButtonText: 'Continuar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Ir al siguiente nivel o a la página de modos de juego
                                    window.location.assign("./modosDeJuego.html");
                                }
                            });
                        } else if (selectedCountry.length === 1 && correctCountry.name.common.toLowerCase
                            ().startsWith(selectedCountry.toLowerCase())) {
                            // Mostrar notificación de acierto con el nombre del país
                            Swal.fire({
                                icon: 'success',
                                title: '¡Casi!',
                                text: 'El país se llama ' + correctCountry.name.common,
                                confirmButtonText: 'Continuar'
                            });
                        } else {
                            // Mostrar notificación de error y actualizar el contador de errores
                            numErrors++;
                            errorCounter.innerHTML = numErrors;
                            if (numErrors === 5) { // Si hay 5 fallos
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Demasiados intentos!',
                                    text: 'Lo siento, has agotado tus intentos. Vuelve a intentarlo en otro momento.',
                                    confirmButtonText: 'Ok'
                                }).then(() => {
                                    window.location.assign("./index.html"); // Redirigir al usuario
                                });
                            } else {
                                // Si aún no hay 5 fallos, mostrar notificación de error
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Incorrecto!',
                                    text: '¡Inténtalo de nuevo!',
                                    confirmButtonText: 'Continuar'
                                });
                            }
                        }
                    });
                    input.addEventListener('change', function () {
                        selectedCountry = input.value.trim();
                        if (selectedCountry.toLowerCase() === correctCountry.name.common.toLowerCase()) {
                            // Mostrar notificación de acierto
                            Swal.fire({
                                icon: 'success',
                                title: '¡Correcto!',
                                text: '¡Has adivinado el país!',
                                confirmButtonText: 'Continuar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Ir al siguiente nivel o a la página de modos de juego
                                    window.location.assign("./modosDeJuego.html");
                                }
                            });
                        } else if (selectedCountry.length === 1 && correctCountry.name.common.toLowerCase().startsWith(selectedCountry.toLowerCase())) {
                            // Mostrar notificación de acierto con el nombre del país
                            Swal.fire({
                                icon: 'success',
                                title: '¡Casi!',
                                text: 'El país se llama ' + correctCountry.name.common,
                                confirmButtonText: 'Continuar'
                            });
                        } else {
                            // Mostrar notificación de error y actualizar el contador de errores
                            numErrors++;
                            errorCounter.innerHTML = numErrors;
                            Swal.fire({
                                icon: 'error',
                                title: '¡Incorrecto!',
                                text: '¡Inténtalo de nuevo!',
                                confirmButtonText: 'Continuar'
                            });
                        }
                    });
                }
            });
        } else {
            redirectToLogin();
        }
    });
});