import getDados from "./getDados.js";

// Mapeia os elementos DOM que você deseja atualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lancamentos: document.querySelector('[data-name="lancamentos"]'),
    series: document.querySelector('[data-name="series"]')
};

// Variáveis para controle do carrossel
let currentIndex = 0;
const itemsPerPage = 4; // Número de imagens a serem exibidas por vez (4)

// Função para criar a lista de filmes
function criarListaFilmes(elemento, dados) {
    // Verifique se há um elemento <ul> dentro da seção
    const ulExistente = elemento.querySelector('ul');

    // Se um elemento <ul> já existe dentro da seção, remova-o
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const carrossel = document.createElement('div');
    carrossel.className = 'carrossel';

    // Cria a lista de filmes
    const ul = document.createElement('ul');
    ul.className = 'lista';

    // Prepara a lista de filmes
    const listaHTML = dados.map((filme) => `
        <li>
            <a href="/detalhes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    carrossel.appendChild(ul);

    // Botões de navegação
    const btnPrev = document.createElement('button');
    btnPrev.id = 'prev';
    btnPrev.ariaLabel = 'Anterior';
    btnPrev.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>'; // Setas como ícones
    carrossel.appendChild(btnPrev);

    const btnNext = document.createElement('button');
    btnNext.id = 'next';
    btnNext.ariaLabel = 'Próximo';
    btnNext.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>'; // Setas como ícones
    carrossel.appendChild(btnNext);

    elemento.appendChild(carrossel);

    // Adiciona eventos para os botões
    btnPrev.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1); // Decrementa o índice, mas não permite que fique negativo
        atualizarCarrossel(ul, dados);
    });

    btnNext.addEventListener('click', () => {
        // Incrementa o índice
        currentIndex++;
        
        // Se o índice ultrapassar o número de itens disponíveis, redefine para 0
        if (currentIndex >= dados.length - itemsPerPage + 1) {
            currentIndex = 0; // Volta para a primeira imagem
        }

        // Atualiza o carrossel
        atualizarCarrossel(ul, dados);
    });

    atualizarCarrossel(ul, dados); // Atualiza a visualização inicial
}

// Função para atualizar a visualização do carrossel
function atualizarCarrossel(ul, dados) {
    const startIndex = currentIndex;
    const endIndex = startIndex + itemsPerPage;

    // Limpa a lista atual
    ul.innerHTML = '';

    // Adiciona os novos itens
    const listaHTML = dados.slice(startIndex, endIndex).map((filme) => `
        <li>
            <a href="/detalhes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
}

// Função genérica para tratamento de erros
function lidarComErro(mensagemErro) {
    console.error(mensagemErro);
}

const linksCategorias = document.querySelectorAll('.cabecalho__nav a');
const sectionsParaOcultar = document.querySelectorAll('.section');
const categoria = document.querySelector('[data-name="categoria"]');

linksCategorias.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do link

        const categoriaSelecionada = this.getAttribute('data-categoria');

        // Oculta todas as seções
        sectionsParaOcultar.forEach(section => {
            section.classList.add('hidden');
        });

        if (categoriaSelecionada === 'todos') {
            // Mostra todas as seções se "todos" for selecionado
            sectionsParaOcultar.forEach(section => {
                section.classList.remove('hidden');
            });
            categoria.classList.add('hidden');
        } else {
            // Mostra a seção da categoria selecionada
            categoria.classList.remove('hidden');
            getDados(`/series/categoria/${categoriaSelecionada}`)
                .then(data => {
                    // Limpa o conteúdo existente antes de adicionar o novo
                    categoria.innerHTML = '';
                    criarListaFilmes(categoria, data);
                })
                .catch(error => {
                    lidarComErro("Ocorreu um erro ao carregar os dados da categoria.");
                });
        }
    });
});




// Array de URLs para as solicitações
geraSeries();
function geraSeries() {
    const urls = ['/series/top5', '/series/lancamentos', '/series'];

    Promise.all(urls.map(url => getDados(url)))
        .then(data => {
            criarListaFilmes(elementos.top5, data[0]);
            criarListaFilmes(elementos.lancamentos, data[1]);
            criarListaFilmes(elementos.series, data[2].slice(0, 5));
        })
        .catch(error => {
            lidarComErro("Ocorreu um erro ao carregar os dados.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const carrosselInicial = document.querySelector('.carrossel-inicial-container');
    const slides = document.querySelectorAll(".carrossel-inicial-slides img");

    // Criar botões de navegação
    const btnPrev = document.createElement('button');
    btnPrev.id = 'prev';
    btnPrev.ariaLabel = 'Anterior';
    btnPrev.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>'; 
    carrosselInicial.appendChild(btnPrev);

    const btnNext = document.createElement('button');
    btnNext.id = 'next';
    btnNext.ariaLabel = 'Próximo';
    btnNext.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>'; 
    carrosselInicial.appendChild(btnNext);

    let currentIndex = 0;

    function showSlide(index) {
        // Remove o blur de todas as imagens antes de atualizar o índice
        slides.forEach(slide => slide.classList.remove('blur'));

        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Calcula o índice da imagem anterior e aplica o blur
        const previousIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        slides[previousIndex].classList.add('blur');

        const offset = -currentIndex * 100;
        document.querySelector(".carrossel-inicial-slides").style.transform = `translateX(${offset}%)`;
    }

    btnNext.addEventListener("click", function () {
        showSlide(currentIndex + 1);
    });

    btnPrev.addEventListener("click", function () {
        showSlide(currentIndex - 1);
    });

    setInterval(function () {
        showSlide(currentIndex + 1);
    }, 7000); // Muda de imagem a cada 7 segundos
});
