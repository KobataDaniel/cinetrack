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

const cards = document.querySelectorAll(".card");

for (const card of cards) {
    const status = card.dataset.status;
    const nota = Number(card.dataset.nota);

    const badge = card.querySelector(".badge");
    const notaElemento = card.querySelector("p:nth-of-type(2)");

    badge.textContent = rotuloStatus(status);
    notaElemento.textContent = `Nota: ${estrelas(nota)}`;
}

const TOTAL = 6;

const totalFilmes = document.querySelector("#total-filmes");

totalFilmes.textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;

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
                <button onclick="editarFilme(${filme.id})">Editar</button>
                <button onclick="removerFilme(${filme.id})">Remover</button>
            </div>

        </article>
    `).join("");
}
renderizarCards(filmesIniciais);