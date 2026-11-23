import Estrelas from "./Estrelas.jsx";
import Badge from "./Badge.jsx";

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
      <p>
        Nota: <Estrelas nota={filme.nota} />
      </p>
      <Badge status={filme.status} />
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