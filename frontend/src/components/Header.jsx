function Header({ busca, aoBuscar, aoAdicionar }) {
    return (
        <header>
            <h1>CineTrack</h1>
            <input
                id="busca"
                placeholder="Buscar filme..."
                value={busca}
                onChange={(e) => aoBuscar(e.target.value)}
            />
            <button className="add_big" onClick={aoAdicionar}>
                + Adicionar
            </button>
        </header>
    );
}

export default Header;