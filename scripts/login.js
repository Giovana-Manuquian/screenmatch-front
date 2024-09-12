// Importar as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCW35I4OXJ5szehU42tCHgYVAeFlOGoLw8",
    authDomain: "alura-series.firebaseapp.com",
    projectId: "alura-series",
    storageBucket: "alura-series.appspot.com",
    messagingSenderId: "239173260626",
    appId: "1:239173260626:web:27c29cb0854aee4aded68b",
    measurementId: "G-TDRWMVP8CN"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Listener para login com email e senha
document.getElementById("login").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Usuário logado com sucesso
        const user = userCredential.user;
        alert("Login bem-sucedido!");
        window.location.href = "perfil.html"; // Redirecionar para a página de perfil
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage); // Exibir mensagem de erro
    });
});

// Listener para login com Google
document.getElementById("google").addEventListener("click", function(event) {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const user = result.user;
        window.location.href = "perfil.html"; // Redirecionar para a página de perfil
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage); // Exibir mensagem de erro
    });
});
