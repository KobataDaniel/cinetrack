// frontend/src/components/Header.jsx
function Header() {
    return (
        <header>
            <h1>CineTrack</h1>
            <input id="busca" placeholder="Buscar filme..." />
            <button className="add_big">+ Adicionar</button>
        </header>
    );
}

export default Header;