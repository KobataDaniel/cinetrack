function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

function estrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function CardFilme({ filme }) {
    return (
        <article className="card">
            <img src={filme.poster || ""} alt={`Pôster de ${filme.titulo}`} />
            <h2>{filme.titulo}</h2>
            <p>
                {filme.ano} • {filme.genero}
            </p>
            <p>Nota: {estrelas(filme.nota)}</p>
            <span className={`badge ${filme.status}`}>
                {rotuloStatus(filme.status)}
            </span>
            <div className="acoes">
                <button className="btn-editar">Editar</button>
                <button className="btn-remover">Remover</button>
            </div>
        </article>
    );
}

export default CardFilme;