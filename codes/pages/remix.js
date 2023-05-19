var contador = 0;
var respuestasCorrectas = 0;

$(document).ready(function () {
    generateRandomQuestions();
});

function generateRandomQuestions() {
    if (contador < 10) {
        var randomNumber = Math.floor(Math.random() * 3);
        if (randomNumber == 0) {
            generateCapitalQuestion();
        } else if (randomNumber == 1) {
            generatePopulationQuestion();
        } else {
            generateFlagQuestion();
        }
    }
}

function generateCapitalQuestion() {
    $(".question-container").empty();
    $(".answer-container").empty();

    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var correctCountry = data[Math.floor(Math.random() * data.length)];
            var correctCapital = Object.values(correctCountry.capital)[0];

            var fakeCountries = [];
            while (fakeCountries.length < 3) {
                var fakeCountry = data[Math.floor(Math.random() * data.length)];
                if (fakeCountry !== correctCountry && !fakeCountries.includes(fakeCountry)) {
                    fakeCountries.push(fakeCountry);
                }
            }
            var fakeCapitals = [Object.values(fakeCountries[0].capital)[0], Object.values(fakeCountries[1].capital)[0], Object.values(fakeCountries[2].capital)[0]];

            var capitals = [correctCapital, fakeCapitals[0], fakeCapitals[1], fakeCapitals[2]];
            shuffleArray(capitals);

            var correctAnswerIndex = capitals.indexOf(correctCapital);

            for (var i = 0; i < capitals.length; i++) {
                var capitalHtml = "<p>" + capitals[i] + "</p>";
                if (i === correctAnswerIndex) {
                    var questionHtml = "<p>¿Cuál es la capital de " + correctCountry.name.common + "?</p>";
                    $(".question-container").append(questionHtml);
                    $(".answer-container").append("<div class='answer' data-correct='true'>" + capitalHtml + "</div>");
                } else {
                    $(".answer-container").append("<div class='answer' data-correct='false'>" + capitalHtml + "</div>");
                }
            }

            $(".answer").click(function () {
                if ($(this).attr("data-correct") === "true") {
                    Swal.fire({
                        title: '¡Correcto!',
                        icon: 'success'
                    });
                    respuestasCorrectas++;
                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);

                if (contador == 10) {
                    showResults();
                }
            });
        },
        error: function () {
            console.log("Error al cargar los datos de los países");
        }
    });
}

function generatePopulationQuestion() {
    $(".question-container").empty();
    $(".answer-container").empty();

    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var correctCountry = data[Math.floor(Math.random() * data.length)];
            var correctPopulation = correctCountry.population;

            var fakeCountries = [];
            while (fakeCountries.length < 3) {
                var fakeCountry = data[Math.floor(Math.random() * data.length)];
                if (fakeCountry !== correctCountry && !fakeCountries.includes(fakeCountry)) {
                    fakeCountries.push(fakeCountry);
                }
            }
            var fakePopulations = [fakeCountries[0].population, fakeCountries[1].population, fakeCountries[2].population];

            var populations = [correctPopulation, fakePopulations[0], fakePopulations[1], fakePopulations[2]];
            shuffleArray(populations);

            var correctAnswerIndex = populations.indexOf(correctPopulation);

            for (var i = 0; i < populations.length; i++) {
                var populationHtml = "<p>" + numberWithCommas(populations[i]) + "</p>";
                if (i === correctAnswerIndex) {
                    var questionHtml = "<p>¿Cuál es la población de " + correctCountry.name.common + "?</p>";
                    $(".question-container").append(questionHtml);
                    $(".answer-container").append("<div class='answer' data-correct='true'>" + populationHtml + "</div>");
                } else {
                    $(".answer-container").append("<div class='answer' data-correct='false'>" + populationHtml + "</div>");
                }
            }

            $(".answer").click(function () {
                if ($(this).attr("data-correct") === "true") {
                    Swal.fire({
                        title: '¡Correcto!',
                        icon: 'success'
                    });
                    respuestasCorrectas++;
                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);

                if (contador == 10) {
                    showResults();
                }
            });
        },
        error: function () {
            console.log("Error al cargar los datos de los países");
        }
    });
}

function generateFlagQuestion() {
    $(".question-container").empty();
    $(".answer-container").empty();

    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var correctCountry = data[Math.floor(Math.random() * data.length)];
            var correctFlag = correctCountry.flags.svg;

            var fakeCountries = [];
            while (fakeCountries.length < 3) {
                var fakeCountry = data[Math.floor(Math.random() * data.length)];
                if (fakeCountry !== correctCountry && !fakeCountries.includes(fakeCountry)) {
                    fakeCountries.push(fakeCountry);
                }
            }
            var fakeFlags = [fakeCountries[0].flags.svg, fakeCountries[1].flags.svg, fakeCountries[2].flags.svg];

            var flags = [correctFlag, fakeFlags[0], fakeFlags[1], fakeFlags[2]];
            shuffleArray(flags);

            var correctAnswerIndex = flags.indexOf(correctFlag);

            for (var i = 0; i < flags.length; i++) {
                var flagHtml = "<img src='" + flags[i] + "'/>";
                if (i === correctAnswerIndex) {
                    var questionHtml = "<p>¿Cuál es la bandera de " + correctCountry.name.common + "?</p>";
                    $(".question-container").append(questionHtml);
                    $(".answer-container").append("<div class='answer' data-correct='true'>" + flagHtml + "</div>");
                } else {
                    $(".answer-container").append("<div class='answer' data-correct='false'>" + flagHtml + "</div>");
                }
            }

            $(".answer").click(function () {
                if ($(this).attr("data-correct") === "true") {
                    Swal.fire({
                        title: '¡Correcto!',
                        icon: 'success'
                    });
                    respuestasCorrectas++;
                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);

                if (contador == 10) {
                    showResults();
                }
            });
        },
        error: function () {
            console.log("Error al cargar los datos de los países");
        }
    });
}

function showResults() {
    $(".question-container").empty();
    $(".answer-container").empty();

    var resultsHtml = "<p>Has acertado " + respuestasCorrectas + " de 10 preguntas.</p>";
    if (respuestasCorrectas < 5) {
        Swal.fire({
            title: '<p>¡Vamos, puedes hacerlo mejor!</p>',
            text: 'Has respondido las 10 preguntas. Ha obtenido ' + respuestasCorrectas + '/10 respuestas correctas.',
            icon: 'error',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("modosDeJuego.html");
            }
        });
    } else if (respuestasCorrectas < 8) {
        Swal.fire({
            title: '¡Felicidades!',
            text: 'Has respondido las 10 preguntas. Ha obtenido ' + respuestasCorrectas + '/10 respuestas correctas.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("modosDeJuego.html");
            }
        });
    } else {
        Swal.fire({
            title: '<p>¡Excelente trabajo!</p>',
            text: 'Has respondido las 10 preguntas. Ha obtenido ' + respuestasCorrectas + '/10 respuestas correctas.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("modosDeJuego.html");
            }
        });
    }

    $(".question-container").append(resultsHtml);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}