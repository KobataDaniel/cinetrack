import { useState } from "react";

const VAZIO = {
    titulo: "",
    ano: "",
    genero: "",
    poster: "",
    status: "quero",
    nota: 3,
    comentario: "",
};

function ModalFilme({ filme, aoSalvar, aoFechar }) {
    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme,
    });
    const [erro, setErro] = useState("");

    function atualizar(campo, valor) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor,
        }));
    }

    async function submeter(evento) {
        evento.preventDefault();
        setErro("");
        try {
            await aoSalvar({
                ...dados,
                ano: Number(dados.ano),
                nota: Number(dados.nota),
            });
        } catch (err) {
            setErro(err.message);
        }
    }

    return (
        <div id="modal">
            <div className="modal-conteudo">
                <button
                    type="button"
                    className="modal-fechar"
                    onClick={aoFechar}
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                <h2>{filme.id ? "Editar filme" : "Novo filme"}</h2>

                <form id="form-filme" onSubmit={submeter}>
                    {erro && <p className="erro-msg">{erro}</p>}

                    <div className="campo">
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            type="text"
                            value={dados.titulo}
                            onChange={(e) => atualizar("titulo", e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="ano">Ano</label>
                        <input
                            id="ano"
                            type="number"
                            value={dados.ano}
                            onChange={(e) => atualizar("ano", e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="genero">Gênero</label>
                        <input
                            id="genero"
                            type="text"
                            value={dados.genero}
                            onChange={(e) => atualizar("genero", e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="poster">URL do pôster (opcional)</label>
                        <input
                            id="poster"
                            type="text"
                            value={dados.poster || ""}
                            onChange={(e) => atualizar("poster", e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={dados.status}
                            onChange={(e) => atualizar("status", e.target.value)}
                        >
                            <option value="assistido">Assistido</option>
                            <option value="assistindo">Assistindo</option>
                            <option value="quero">Quero assistir</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="nota">Nota (1 a 5)</label>
                        <select
                            id="nota"
                            value={dados.nota}
                            onChange={(e) => atualizar("nota", e.target.value)}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="comentario">Comentário (opcional)</label>
                        <textarea
                            id="comentario"
                            value={dados.comentario || ""}
                            onChange={(e) => atualizar("comentario", e.target.value)}
                        />
                    </div>

                    <div className="acoes">
                        <button type="button" onClick={aoFechar}>
                            Cancelar
                        </button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalFilme;