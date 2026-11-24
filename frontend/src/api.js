const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function pedir(caminho, opcoes = {}) {
    const r = await fetch(BASE + caminho, {
        headers: { "Content-Type": "application/json" },
        ...opcoes,
    });
    if (!r.ok) {
        const corpo = await r.json().catch(() => null);
        const mensagem = corpo?.erros
            ? corpo.erros.join("\n")
            : corpo?.erro || `HTTP ${r.status}`;
        throw new Error(mensagem);
    }
    return r.status === 204 ? null : r.json();
}

export const listar = () => pedir("/filmes");

export const criar = (f) =>
    pedir("/filmes", { method: "POST", body: JSON.stringify(f) });

export const atualizar = (id, f) =>
    pedir(`/filmes/${id}`, { method: "PUT", body: JSON.stringify(f) });

export const remover = (id) =>
    pedir(`/filmes/${id}`, { method: "DELETE" });