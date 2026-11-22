import CardFilme from "./CardFilme.jsx";

function ListaFilmes({ filmes, aoEditar, aoRemover }) {
    if (filmes.length === 0) {
        return <p>Nenhum filme encontrado.</p>;
    }

    return (
        <section id="lista" aria-live="polite">
            {filmes.map((filme) => (
                <CardFilme
                    key={filme.id}
                    filme={filme}
                    aoEditar={aoEditar}
                    aoRemover={aoRemover}
                />
            ))}
        </section>
    );
}

export default ListaFilmes;