function estrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir",
};

function CardFilme({ filme, aoEditar, aoRemover }) {
    return (
        <article className="card">
            <img
                src={filme.poster || "https://placehold.co/300x450?text=Sem+Poster"}
                alt={filme.titulo}
            />
            <h2>{filme.titulo}</h2>
            <p>
                {filme.ano} · {filme.genero}
            </p>
            <p>Nota: {estrelas(filme.nota)}</p>
            <span className={`badge ${filme.status}`}>
                {ROTULOS[filme.status]}
            </span>
            {filme.comentario && <p className="comentario">{filme.comentario}</p>}
            <div className="acoes">
                <button type="button" onClick={() => aoEditar(filme)}>
                    Editar
                </button>
                <button type="button" onClick={() => aoRemover(filme.id)}>
                    Remover
                </button>
            </div>
        </article>
    );
}

export default CardFilme;