import CardFilme from "./CardFilme.jsx";

function ListaFilmes({ filmes }) {
    if (filmes.length === 0) {
        return <p>Nenhum filme encontrado.</p>;
    }

    return (
        <section id="lista" aria-live="polite">
            {filmes.map((filme) => (
                <CardFilme key={filme.id} filme={filme} />
            ))}
        </section>
    );
}

export default ListaFilmes;