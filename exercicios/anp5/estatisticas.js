export function mediaNotas(lista) {
    if (!lista || lista.length === 0) return 0;
    
    const soma = lista.reduce((acumulador, filme) => acumulador + filme.nota, 0);
    const media = soma / lista.length;
    
    return Number(media.toFixed(1));
}

export function contagemPorStatus(lista) {
    return lista.reduce((acumulador, filme) => {
        const status = filme.status;
        acumulador[status] = (acumulador[status] || 0) + 1;
        return acumulador;
    }, {});
}

export function ordenarPorNota(lista) {
    return [...lista].sort((a, b) => b.nota - a.nota);
}