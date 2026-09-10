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