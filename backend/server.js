const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const ARQUIVO = path.join(__dirname, "data", "filmes.json");

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
    const dados = req.body;

    if (!dados.titulo || !dados.ano) {
        return res.status(400).json({ erro: "Dados obrigatórios" });
    }

    const lista = lerFilmes();
    const novo = { id: gerarId(lista), ...dados };
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

    lista[i] = { ...lista[i], ...req.body, id };
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