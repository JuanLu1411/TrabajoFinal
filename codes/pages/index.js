const firebaseConfig = {
	apiKey: "AIzaSyCC4rz4OeZt8PtnqeZesM84mzO96XhFeAc",
	authDomain: "hit-patriae.firebaseapp.com",
	projectId: "hit-patriae",
	storageBucket: "hit-patriae.appspot.com",
	messagingSenderId: "522944525984",
	appId: "1:522944525984:web:1ab69893e410102c2f7bc5",
	measurementId: "G-7SNJ9NM4SV"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginForm = document.forms.loginForm;

// Escuchar el evento click del botón de acceso
document.querySelector('#btnLogin').addEventListener('click', e => {
	e.preventDefault();
	const email = loginForm.email.value;
	const password = loginForm.password.value;
	const isLogin = loginForm.isLoginOrSignup.value === 'isLogin';

	if (isLogin) {
		// Iniciar sesión con correo y contraseña
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(userCredential => {
				// Login exitoso
				const user = userCredential.user;
				console.log("Usuario logueado:", user);
				alert("Usuario logueado correctamente");
				window.location.assign("pages/modosDeJuego.html");
			})
			.catch(error => {
				// Error en el login
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error en el login:", errorCode, errorMessage);
				alert("El usuario o contraseña son incorrectos");
			});
	} else {
		// Crear cuenta con correo y contraseña
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(userCredential => {
				// Registro exitoso
				const user = userCredential.user;
				alert("Usuario creado correctamente")
			})
			.catch(error => {
				// Error en el registro
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error en el registro:", errorCode, errorMessage);
			});
	}
});


const btnLoginGoogle = document.getElementById("btnLoginGoogle");

btnLoginGoogle.addEventListener("click", () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider)
		.then((result) => {
			// Login exitoso
			const user = result.user;
			const userString = JSON.stringify(user);
			window.localStorage.setItem("user", userString);
			console.log("Usuario logueado:", user);
			alert("Usuario logueado correctamente con google");
			window.location.assign("pages/modosDeJuego.html");
		})
		.catch((error) => {
			// Error en el login
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error("Error en el login:", errorCode, errorMessage);
		});
});
