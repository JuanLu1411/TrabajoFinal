var contador = 0;

$(document).ready(function generateQuestion() {
    // Limpiar la pregunta y las respuestas anteriores
    $(".question-container").empty();
    $(".answer-container").empty();

    // Resto del código para generar una nueva pregunta y respuestas
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            // Selecciona aleatoriamente un país
            var correctCountry = data[Math.floor(Math.random() * data.length)];
            var correctFlag = correctCountry.flags.png;

            // Selecciona aleatoriamente tres países diferentes
            var fakeCountries = [];
            while (fakeCountries.length < 3) {
                var fakeCountry = data[Math.floor(Math.random() * data.length)];
                if (fakeCountry !== correctCountry && !fakeCountries.includes(fakeCountry)) {
                    fakeCountries.push(fakeCountry);
                }
            }
            var fakeFlags = [fakeCountries[0].flags.png, fakeCountries[1].flags.png, fakeCountries[2].flags.png];

            // Mezcla las banderas en un arreglo
            var flags = [correctFlag, fakeFlags[0], fakeFlags[1], fakeFlags[2]];
            shuffleArray(flags);

            // Encuentra la posición de la respuesta correcta
            var correctAnswerIndex = flags.indexOf(correctFlag);

            // Muestra las banderas en la página
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

            // Maneja la selección del usuario
            $(".answer").click(function () {
                if ($(this).attr("data-correct") === "true") {
                    alert("¡Correcto!");
                    // Aumenta el contador en 1 y actualiza el contenido del elemento #contador
                    contador ++;
                    $("#contador").text(contador);
                    // Llama a la función generateQuestion después de 2 segundos
                    setTimeout(generateQuestion);
                } else {
                    alert("¡¡Incorrecto!!");
                    contador = 0;
                    $("#contador").text(contador);
                }
            });
        },
        error: function (xhr, status, error) {
            // Maneja cualquier error que ocurra durante la solicitud
            console.log("Error: " + error);
        }
    });
});

function shuffleArray(array) {
    // Recorre el arreglo en orden inverso
    for (var i = array.length - 1; i > 0; i--) {
        // Selecciona un índice aleatorio entre 0 y i
        var j = Math.floor(Math.random() * (i + 1));
        // Intercambia los elementos en las posiciones i y j
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}