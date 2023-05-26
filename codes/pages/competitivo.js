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


function sumarAcierto() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user.uid);
    console.log(user.email);
    var aciertos;
    const userRef = database.ref(user.uid);
    userRef.once("value", function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        if (snapshot.exists()) {
            console.log(data.aciertos);
            if (data.aciertos != null) {
                aciertos = data.aciertos;
                console.log(aciertos);
            } else {
                aciertos = 0;
            }
        } else {
            aciertos = 0;
        }

        aciertos = aciertos + 1;

        const userData = {
            aciertos: aciertos
        }

        console.log(aciertos)

        userRef.set(userData);

        if (aciertos >= 400) {
            $("#rangoImagen").attr("src", "../../img/radiante.png");
            $(".nombreRango").html("Radiante<br><br> ¡Rango Maximo!:<br>"+aciertos)
        } else if (aciertos >= 350) {
            $("#rangoImagen").attr("src", "../../img/inmortal.png");
            $(".nombreRango").html("Inmortal<br><br> Siengiente rango:<br>"+aciertos+"/400")
        } else if (aciertos >= 300) {
            $("#rangoImagen").attr("src", "../../img/ascendente.png");
            $(".nombreRango").html("Ascendente<br><br> Siengiente rango:<br>"+aciertos+"/350")
        } else if (aciertos >= 250) {
            $("#rangoImagen").attr("src", "../../img/diamante.png");
            $(".nombreRango").html("Diamante<br><br> Siengiente rango:<br>"+aciertos+"/300")
        }else if (aciertos >= 200) {
            $("#rangoImagen").attr("src", "../../img/platino.png");
            $(".nombreRango").html("Platino<br><br> Siengiente rango:<br>"+aciertos+"/250")
        }else if (aciertos >= 150) {
            $("#rangoImagen").attr("src", "../../img/oro.png");
            $(".nombreRango").html("Oro<br><br> Siengiente rango:<br>"+aciertos+"/200")
        }else if (aciertos >= 100) {
            $("#rangoImagen").attr("src", "../../img/plata.png");
            $(".nombreRango").html("Plata<br><br> Siengiente rango:<br>"+aciertos+"/150")
        }else if (aciertos >= 50) {
            $("#rangoImagen").attr("src", "../../img/bronce.png");
            $(".nombreRango").html("Bronce<br><br> Siengiente rango:<br>"+aciertos+"/100")
        }else {
            $("#rangoImagen").attr("src", "../../img/hierro.png");
            $(".nombreRango").html("Hierro<br><br> Siengiente rango:<br>"+aciertos+"/50")
        }
    });
}

var contador = 0;
var respuestasCorrectas = 0;

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // El usuario está registrado, generar preguntas aleatorias
            generateRandomQuestions();

            // Verificar si la imagen está almacenada en el localStorage
            var rangoImagenSrc = localStorage.getItem("rangoImagenSrc");
            if (rangoImagenSrc) {
                $("#rangoImagen").attr("src", rangoImagenSrc);
            } else {
                $("#rangoImagen").attr("src", "../../img/fondoCompetitivo.png");
            }
        } else {
            // El usuario no está registrado, redirigir a la página de inicio de sesión
            window.location.href = "login.html";
        }
    });
});

function generateRandomQuestions() {
    var randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber == 0) {
        generateCapitalQuestion();
    } else if (randomNumber == 1) {
        generatePopulationQuestion();
    } else {
        generateFlagQuestion();
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

                    sumarAcierto();

                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);

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

                    sumarAcierto();
                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);
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
                    sumarAcierto();
                } else {
                    Swal.fire({
                        title: '¡Incorrecto!',
                        icon: 'error'
                    });
                }
                contador++;
                setTimeout(generateRandomQuestions, 100);
            });
        },
        error: function () {
            console.log("Error al cargar los datos de los países");
        }
    });
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