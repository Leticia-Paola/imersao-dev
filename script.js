const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#busca");
let dados = [];

async function buscarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

document.addEventListener('mousemove', (e) => {
  const body = document.querySelector('body');
  const x = (e.clientX / window.innerWidth) * 50;
  const y = (e.clientY / window.innerHeight) * 50;

  body.style.setProperty('--x', `${x}%`);
  body.style.setProperty('--y', `${y}%`);
});

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os novos cards

    for (const dado of dadosParaRenderizar) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `<img src="${dado.imagem}" alt="${dado.nome}" class="card-img">
          <h2>${dado.nome}</h2>
          <p>${dado.ano}</p>
          <p>${dado.descricao}</p>
          <a href="${dado.link}" target="_blank">Saiba mais</a>        
        `;
        cardContainer.appendChild(article);
    }
}

function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        const termoPesquisado = removerAcentos(campoBusca.value.toLowerCase());

        const dadosFiltrados = dados.filter((dado) => {
            const checarTexto = (texto) => removerAcentos(texto.toLowerCase()).includes(termoPesquisado);
            
            const tagsNormalizadas = dado.tags ? dado.tags.map(tag => removerAcentos(tag.toLowerCase())) : [];

            return (
                checarTexto(dado.nome) ||
                checarTexto(dado.descricao) ||
                tagsNormalizadas.some(tag => tag.includes(termoPesquisado))
            );
        });

        renderizarCards(dadosFiltrados); // <<< AGORA ESTÁ NO LUGAR CERTO
        
    });
}


buscarDados();

// Configuração e inicialização do ScrollReveal
const sr = ScrollReveal({
    duration: 1000,
    distance: '40px',
    easing: 'ease-out',
    reset: false
});

// Animações dos elementos
sr.reveal('header', { origin: 'top', distance: '20px', opacity: 0 });
sr.reveal('.card-container', { origin: 'top' });
sr.reveal('.card', {
    origin: 'bottom',
    distance: '50px',
    duration: 900,
    interval: 150
});