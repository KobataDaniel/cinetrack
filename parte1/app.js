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

// Validação pura (Aula 4)
function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo) {
        erros.push("Título obrigatório");
    }
    if (filme.ano < 1888 || filme.ano > 2030) {
        erros.push("Ano inválido");
    }
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

const totalFilmes = document.querySelector("#total-filmes");
const lista = document.querySelector("#lista");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");

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

let filmes = [...filmesIniciais];
let editandoId = null; 
let statusAtual = "todos";


function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;
    card.dataset.status = f.status;
    card.dataset.nota = f.nota;

    const img = document.createElement("img");
    img.src = f.poster;
    img.alt = `Poster de ${f.titulo}`;

    const h2 = document.createElement("h2");
    h2.textContent = f.titulo;

    const pInfo = document.createElement("p");
    pInfo.textContent = `${f.ano} • ${f.genero}`;

    const pNota = document.createElement("p");
    pNota.textContent = `Nota: ${estrelas(f.nota)}`;

    const spanBadge = document.createElement("span");
    spanBadge.className = `badge ${f.status}`;
    spanBadge.textContent = rotuloStatus(f.status);

    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.dataset.id = f.id;
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.dataset.id = f.id;
    btnRemover.textContent = "Remover";

    divAcoes.append(btnEditar, btnRemover);
    card.append(img, h2, pInfo, pNota, spanBadge, divAcoes);

    return card;
}

function renderizarCards(listaFilmes) {
    const frag = document.createDocumentFragment();
    listaFilmes.forEach((f) => {
        frag.appendChild(criarCard(f));
    });
    lista.replaceChildren(frag);
}


const abrir = () => (modal.hidden = false);
const fechar = () => (modal.hidden = true);

// Botão Adicionar (Desktop e Mobile)
document.querySelectorAll("header button.add_big, header button.add_small, footer a[href='adicionar.html']").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        editandoId = null;
        form.reset();
        abrir();
    });
});

// Fechar modal com botão de fechar ou tecla Escape
document.querySelector(".modal-fechar").addEventListener("click", fechar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        alert(erros.join("\n"));
        return;
    }

    if (editandoId !== null) {
        // Editando filme existente
        filmes = filmes.map((f) =>
            f.id === editandoId ? { ...f, ...dados } : f
        );
    } else {
        // Adicionando novo filme
        const novoFilme = {
            id: gerarId(filmes),
            ...dados,
            poster: dados.url || "https://www.themoviedb.org/t/p/w600_and_h900_face/placeholder.jpg"
        };
        filmes = [...filmes, novoFilme];
    }

    atualizarLista();
    fechar();
});



lista.addEventListener("click", (e) => {
    const alvo = e.target;
    if (!(alvo instanceof Element)) return;

    // Ação de Remover
    const botaoRemover = alvo.closest(".btn-remover");
    if (botaoRemover) {
        if (!confirm("Deseja remover este filme?")) return;
        const card = botaoRemover.closest(".card");
        const id = Number(card.dataset.id);
        filmes = filmes.filter((filme) => filme.id !== id);
        atualizarLista();
        return;
    }

    // Ação de Editar
    const botaoEditar = alvo.closest(".btn-editar");
    if (botaoEditar) {
        const card = botaoEditar.closest(".card");
        editandoId = Number(card.dataset.id);
        const f = filmes.find((x) => x.id === editandoId);

        if (f) {
            form.elements.titulo.value = f.titulo;
            form.elements.ano.value = f.ano;
            form.elements.genero.value = f.genero;
            form.elements.url.value = f.poster;
            form.elements.status.value = f.status;
            form.elements.nota.value = f.nota;
            form.elements.comentario.value = f.comentario || "";
            abrir();
        }
    }
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

function atualizarTotal() {
    totalFilmes.textContent = `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

function atualizarLista() {
    const filmesFiltrados = filmes.filter(
        (filme) => statusAtual === "todos" || filme.status === statusAtual
    );

    renderizarCards(filmesFiltrados);
    atualizarTotal();
}

atualizarLista();