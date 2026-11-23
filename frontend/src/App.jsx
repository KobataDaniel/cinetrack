import { useState, useEffect } from "react";
import { listar, criar, atualizar, remover } from "./api.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`;
  }, [filmes.length]);

  const visiveis = filmes
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );

  async function removerFilme(id) {
    await remover(id);
    setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
  }

  async function salvar(dados) {
    if (editando.id) {
      const atualizado = await atualizar(editando.id, dados);
      setFilmes((anteriores) =>
        anteriores.map((filme) =>
          filme.id === atualizado.id ? atualizado : filme
        )
      );
    } else {
      const novo = await criar(dados);
      setFilmes((anteriores) => [...anteriores, novo]);
    }
    setEditando(null);
  }

  let conteudo;
  if (carregando) {
    conteudo = <p>Carregando...</p>;
  } else if (erro) {
    conteudo = <p className="erro">Erro: {erro}</p>;
  } else {
    conteudo = (
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={removerFilme}
      />
    );
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <Filtros ativo={status} aoMudar={setStatus} />
      <main>{conteudo}</main>
      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}

export default App;