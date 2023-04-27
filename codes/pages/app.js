var contador = 0;
var respuestasCorrectas = 0; // Agrega una variable para rastrear el número de respuestas correctas

$(document).ready(function generateQuestion() {
    $(".question-container").empty();
    $(".answer-container").empty();

    if (contador < 10) {
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var correctCountry = data[Math.floor(Math.random() * data.length)];
                var correctFlag = correctCountry.flags.png;

                var fakeCountries = [];
                while (fakeCountries.length < 3) {
                    var fakeCountry = data[Math.floor(Math.random() * data.length)];
                    if (fakeCountry !== correctCountry && !fakeCountries.includes(fakeCountry)) {
                        fakeCountries.push(fakeCountry);
                    }
                }
                var fakeFlags = [fakeCountries[0].flags.png, fakeCountries[1].flags.png, fakeCountries[2].flags.png];

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
                        alert("¡Correcto!");
                        respuestasCorrectas++; // Aumenta el número de respuestas correctas en 1
                        contador++;
                        if (contador != 10) {
                            setTimeout(generateQuestion, 0100);
                        } else {
                            alert("Has respondido las 10 preguntas. Ha obtenido " + respuestasCorrectas + "/10 respuestas correctas."); // Muestra el número de respuestas correctas
                            window.location.assign("modosDeJuego.html");
                        }
                    } else {
                        alert("¡Incorrecto!");
                        contador++;
                        setTimeout(generateQuestion, 0100);
                    }

                    if (contador == 10 && respuestasCorrectas < 5) {
                        alert("Has respondido las 10 preguntas. Ha obtenido " + respuestasCorrectas + "/10 respuestas correctas.");
                        window.location.assign("modosDeJuego.html");
                    }
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    }
    document.getElementById("puntuacion").innerHTML = contador;
    document.getElementById("puntuacion").innerHTML += "/10";
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}