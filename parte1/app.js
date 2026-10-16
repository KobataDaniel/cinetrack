function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => {
    let resultado = "";

    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }

    return resultado;
};

function validarFilme(filme) {
    const erros = [];

    if (!filme.titulo || !filme.titulo.trim()) {
        erros.push("Título obrigatório");
    }

    if (!filme.ano || filme.ano < 1888 || filme.ano > 2030) {
        erros.push("Ano inválido");
    }
    
    if (!filme.nota || filme.nota < 1 || filme.nota > 5) {
        erros.push("Nota deve ser entre 1 e 5");
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

const gerarId = (lista) =>
    Math.max(0, ...lista.map((f) => f.id)) + 1;

const totalFilmes = document.querySelector("#total-filmes");
const lista = document.querySelector("#lista");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const nav = document.querySelector("nav");
const busca = document.querySelector("#busca");
const msgErro = document.querySelector("#mensagem-erro");

const CHAVE_STORAGE = "cinetrack:filmes";

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

function carregar() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (dados === null) {
            return filmesIniciais.map((filme) => ({ ...filme }));
        }

        const filmesSalvos = JSON.parse(dados);

        if (!Array.isArray(filmesSalvos)) {
            return filmesIniciais.map((filme) => ({ ...filme }));
        }

        return filmesSalvos;
    } catch (erro) {
        console.error("Erro ao carregar filmes:", erro);
        return filmesIniciais.map((filme) => ({ ...filme }));
    }
}

function salvar() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
    } catch (erro) {
        console.error("Erro ao salvar filmes:", erro);
        alert("Não foi possível salvar os filmes neste navegador.");
    }
}

let filmes = carregar();
let editandoId = null;
let statusAtual = "todos";
let termoBusca = "";

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;
    card.dataset.status = f.status;
    card.dataset.nota = f.nota;

    const img = document.createElement("img");
    img.src = f.poster || "";
    img.alt = `Pôster de ${f.titulo}`;

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

    listaFilmes.forEach((filme) => {
        frag.appendChild(criarCard(filme));
    });

    lista.replaceChildren(frag);
}

function aplicarFiltros() {
    const termo = termoBusca.trim().toLocaleLowerCase("pt-BR");

    return filmes.filter((filme) => {
        const correspondeStatus =
            statusAtual === "todos" ||
            filme.status === statusAtual;

        const textoFilme = filme.titulo.toLocaleLowerCase("pt-BR");

        const correspondeBusca = textoFilme.includes(termo);

        return correspondeStatus && correspondeBusca;
    });
}

function atualizarTotal() {
    totalFilmes.textContent =
        `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

function atualizar() {
    renderizarCards(aplicarFiltros());
    atualizarTotal();
}

const abrir = () => {
    modal.hidden = false;
};

const fechar = () => {
    modal.hidden = true;
    if(msgErro) msgErro.textContent = "";
};

document.querySelectorAll(
    "header button.add_big, header button.add_small, footer a[href='adicionar.html']"
).forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        editandoId = null;
        form.reset();
        if(msgErro) msgErro.textContent = "";
        abrir();
    });
});

document.querySelector(".modal-fechar").addEventListener("click", fechar);

const btnCancelar = document.querySelector(".btn-cancelar");
if (btnCancelar) {
    btnCancelar.addEventListener("click", fechar);
}

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
        if(msgErro) {
            msgErro.textContent = erros.join("\n");
        }
        return;
    }

    const poster = dados.url ||
        "https://www.themoviedb.org/t/p/w600_and_h900_face/qMxuftbWGhI9Vc9CUCoOV268Ndr.jpg";
        // Problemas modernos requerem soluções modernas. Sim, é um filme chamado 'Placeholder'.
    const {
        url,
        ...dadosFilme
    } = dados;

    if (editandoId !== null) {
        filmes = filmes.map((filme) =>
            filme.id === editandoId
                ? {
                    ...filme,
                    ...dadosFilme,
                    poster
                }
                : filme
        );
    } else {
        const novoFilme = {
            id: gerarId(filmes),
            ...dadosFilme,
            poster
        };

        filmes = [...filmes, novoFilme];
    }

    salvar();
    atualizar();
    fechar();
});

lista.addEventListener("click", (e) => {
    const alvo = e.target;

    if (!(alvo instanceof Element)) return;

    const botaoRemover = alvo.closest(".btn-remover");

    if (botaoRemover) {
        if (!confirm("Deseja remover este filme?")) return;

        const id = Number(botaoRemover.dataset.id);

        filmes = filmes.filter((filme) => filme.id !== id);

        salvar();
        atualizar();
        return;
    }

    const botaoEditar = alvo.closest(".btn-editar");

    if (botaoEditar) {
        editandoId = Number(botaoEditar.dataset.id);

        const filme = filmes.find(
            (item) => item.id === editandoId
        );

        if (!filme) return;

        form.elements.titulo.value = filme.titulo;
        form.elements.ano.value = filme.ano;
        form.elements.genero.value = filme.genero;
        form.elements.url.value = filme.poster || "";
        form.elements.status.value = filme.status;
        form.elements.nota.value = filme.nota;
        form.elements.comentario.value = filme.comentario || "";
        if(msgErro) msgErro.textContent = "";

        abrir();
    }
});

nav.addEventListener("click", (e) => {
    const alvo = e.target;

    if (!(alvo instanceof Element)) return;

    const botao = alvo.closest("button");

    if (!botao || !nav.contains(botao)) return;

    nav.querySelector(".ativo")?.classList.remove("ativo");
    botao.classList.add("ativo");

    statusAtual = botao.dataset.status;

    atualizar();
});

function debounce(funcao, intervalo) {
    let temporizador;

    return (...args) => {
        clearTimeout(temporizador);

        temporizador = setTimeout(() => {
            funcao(...args);
        }, intervalo);
    };
}

function aoDigitar() {
    termoBusca = busca.value;
    atualizar();
}

if (busca) {
    busca.addEventListener("input", debounce(aoDigitar, 300));
}

atualizar();