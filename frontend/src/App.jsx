import { useState, useEffect } from "react";
import { listar, criar, atualizar, remover } from "./api.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

const CHAVE_FILTROS = "cinetrack:filtros";

function lerFiltrosSalvos() {
  try {
    const salvo = localStorage.getItem(CHAVE_FILTROS);
    if (!salvo) return { status: "todos", busca: "" };

    const dados = JSON.parse(salvo);
    return {
      status: typeof dados?.status === "string" ? dados.status : "todos",
      busca: typeof dados?.busca === "string" ? dados.busca : "",
    };
  } catch {
    return { status: "todos", busca: "" };
  }
}

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState(() => lerFiltrosSalvos().status);
  const [busca, setBusca] = useState(() => lerFiltrosSalvos().busca);
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

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ busca, status }));
    } catch (erro) {
      console.error("Erro ao salvar filtros:", erro);
    }
  }, [busca, status]);

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
      <p style={{ padding: "0 24px" }}>
        Exibindo {visiveis.length} de {filmes.length} filmes
      </p>
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