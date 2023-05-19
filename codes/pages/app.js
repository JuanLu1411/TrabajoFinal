var contador = 0;
var respuestasCorrectas = 0;

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
                        Swal.fire({
                            title: '¡Correcto!',
                            icon: 'success'
                        });
                        respuestasCorrectas++;
                        contador++;
                        if (contador != 10) {
                            setTimeout(generateQuestion, 100);
                            console.log(contador)
                        } else {
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
                        }
                    } else {
                        Swal.fire({
                            title: '¡Incorrecto!',
                            icon: 'error'
                        });
                        contador++;
                        setTimeout(generateQuestion, 100);
                    }

                    if (contador == 10 && respuestasCorrectas < 5) {
                        Swal.fire({
                            title: '¡Lo siento!',
                            text: 'Has respondido las 10 preguntas. Solo has obtenido ' + respuestasCorrectas + '/10 respuestas correctas. Debes obtener al menos 5 respuestas correctas para pasar la prueba.',
                            icon: 'warning',
                            confirmButtonText: 'Volver a intentar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                contador = 0;
                                respuestasCorrectas = 0;
                                generateQuestion();
                            }
                        });
                    }
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}