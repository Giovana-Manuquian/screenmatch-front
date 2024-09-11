document.querySelectorAll('.perfil').forEach(perfil => {
    perfil.addEventListener('click', () => {
        // Supondo que a URL da página principal seja 'index.html'
        // Você pode personalizar a URL conforme necessário
        window.location.href = 'index.html';
    });
});