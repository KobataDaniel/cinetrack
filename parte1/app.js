function rotuloStatus(status) {
    if (status === "assistido") {
        return "Assistido";
    }

    if (status === "assistindo") {
        return "Assistindo";
    }

    if (status === "quero") {
        return "Quero assistir";
    }

    return status;
}

const estrelas = (nota) => {
    let resultado = "";

    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }

    return resultado;
};

const totalFilmes = document.querySelector("#total-filmes");

const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção Científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
        nota: 5,
        status: "assistido",
        comentario: "História muito criativa."
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
        nota: 4,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção Científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg",
        nota: 4,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção Científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
        nota: 4,
        status: "quero",
        comentario: ""
    }
];

function renderizarCards(lista) {
    const container = document.querySelector("#lista");

    container.innerHTML = lista.map(filme => `
        <article class="card"
                 data-id="${filme.id}"
                 data-status="${filme.status}"
                 data-nota="${filme.nota}">

            <img src="${filme.poster}"
                 alt="Poster de ${filme.titulo}">

            <h2>${filme.titulo}</h2>

            <p>${filme.ano} • ${filme.genero}</p>

            <p>Nota: ${"★".repeat(filme.nota)}${"☆".repeat(5 - filme.nota)}</p>

            <span class="badge ${filme.status}">
                ${rotuloStatus(filme.status)}
            </span>

            <div class="acoes">
                <button class="btn-editar" data-id="${filme.id}">Editar</button>
                <button class="btn-remover" data-id="${filme.id}">Remover</button>
            </div>

        </article>
    `).join("");
}

let filmes = [...filmesIniciais]

renderizarCards(filmes);



const lista = document.querySelector("#lista");

lista.addEventListener("click", (e) => {
    const alvo = e.target;

    if (!(alvo instanceof Element)) return;

    const botao = alvo.closest(".btn-remover");

    if (!botao) return;

    if (!confirm("Deseja remover este filme?")) return;

    const card = botao.closest(".card");
    const id = Number(card.dataset.id);

    filmes = filmes.filter((filme) => filme.id !== id);

    atualizarLista();
});




const nav = document.querySelector("nav");

nav.addEventListener("click", (e) => {
    const alvo = e.target;

    if (!(alvo instanceof Element)) return;

    const botao = alvo.closest("button");

    if (!botao || !nav.contains(botao)) return;

    nav.querySelector(".ativo")?.classList.remove("ativo");
    botao.classList.add("ativo");

    statusAtual = botao.dataset.status;

    atualizarLista();
});



let statusAtual = "todos";

function atualizarTotal() {
    totalFilmes.textContent =
        `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

function atualizarLista() {
    const filmesFiltrados = filmes.filter((filme) =>
        statusAtual === "todos" || filme.status === statusAtual
    );

    renderizarCards(filmesFiltrados);
    atualizarTotal();
}

atualizarLista();
