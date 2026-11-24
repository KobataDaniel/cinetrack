const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const ARQUIVO = path.join(__dirname, "data", "filmes.json");
const STATUS_VALIDOS = ["assistido", "assistindo", "quero"];

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

function lerFilmes() {
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

function salvarFilmes(lista) {
    fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2));
}

function gerarId(lista) {
    const ids = lista.map((filme) => filme.id);
    return Math.max(0, ...ids) + 1;
}

function calcularMediaNotas(lista) {
    if (!lista || lista.length === 0) return 0;

    const soma = lista.reduce((acumulador, filme) => acumulador + filme.nota, 0);
    const media = soma / lista.length;

    return Number(media.toFixed(1));
}

function contarPorStatus(lista) {
    return lista.reduce((acumulador, filme) => {
        const status = filme.status;
        acumulador[status] = (acumulador[status] || 0) + 1;
        return acumulador;
    }, {});
}

function validarFilme(filme) {
    const erros = [];

    if (!filme.titulo || typeof filme.titulo !== "string" || !filme.titulo.trim()) {
        erros.push("título é obrigatório");
    }

    const ano = Number(filme.ano);
    if (!Number.isInteger(ano) || ano < 1888 || ano > 2030) {
        erros.push("ano deve estar entre 1888 e 2030");
    }

    const nota = Number(filme.nota);
    if (!Number.isFinite(nota) || nota < 1 || nota > 5) {
        erros.push("nota deve estar entre 1 e 5");
    }

    if (!STATUS_VALIDOS.includes(filme.status)) {
        erros.push("status deve ser assistido, assistindo ou quero");
    }

    return erros;
}

app.get("/filmes", (req, res) => {
    let lista = lerFilmes();

    if (req.query.status) {
        lista = lista.filter((f) => f.status === req.query.status);
    }

    if (req.query.q) {
        const termo = req.query.q.toLowerCase();
        lista = lista.filter((f) => f.titulo.toLowerCase().includes(termo));
    }

    res.json(lista);
});

app.get("/stats", (req, res) => {
    const lista = lerFilmes();

    res.json({
        total: lista.length,
        porStatus: contarPorStatus(lista),
        mediaNotas: calcularMediaNotas(lista),
    });
});

app.get("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const filme = lerFilmes().find((f) => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
});

app.post("/filmes", (req, res) => {
    const dados = req.body || {};
    const erros = validarFilme(dados);

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    const lista = lerFilmes();
    const novo = {
        ...dados,
        id: gerarId(lista),
        titulo: dados.titulo.trim(),
        ano: Number(dados.ano),
        nota: Number(dados.nota),
    };
    lista.push(novo);
    salvarFilmes(lista);

    res.status(201).json(novo);
});

app.put("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();
    const i = lista.findIndex((f) => f.id === id);

    if (i === -1) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const mesclado = { ...lista[i], ...req.body, id };
    const erros = validarFilme(mesclado);

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    lista[i] = {
        ...mesclado,
        titulo: mesclado.titulo.trim(),
        ano: Number(mesclado.ano),
        nota: Number(mesclado.nota),
    };
    salvarFilmes(lista);

    res.json(lista[i]);
});

app.delete("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();

    if (!lista.some((f) => f.id === id)) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    salvarFilmes(lista.filter((f) => f.id !== id));
    res.sendStatus(204);
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`API na porta ${porta}`);
});