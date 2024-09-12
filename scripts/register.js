// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCW35I4OXJ5szehU42tCHgYVAeFlOGoLw8",
    authDomain: "alura-series.firebaseapp.com",
    projectId: "alura-series",
    storageBucket: "alura-series.appspot.com",
    messagingSenderId: "239173260626",
    appId: "1:239173260626:web:27c29cb0854aee4aded68b",
    measurementId: "G-TDRWMVP8CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("register").addEventListener("click", function(event) { 
    event.preventDefault(); // Impede o comportamento padrão do botão

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Conta criada com sucesso!");
        window.location.href = "login.html"; // Redireciona para a página de login
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage); // Mostra mensagem de erro se falhar
    });
});
