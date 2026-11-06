import { filmesIniciais } from './filmes.js';
import { mediaNotas, contagemPorStatus, ordenarPorNota } from './estatisticas.js';

console.log("=== ANP 05 - Estatísticas ===");

// 1. Média das Notas
const media = mediaNotas(filmesIniciais);
console.log("Média das notas:", media);

// 2. Contagem por Status
const contagem = contagemPorStatus(filmesIniciais);
console.log("Contagem por status:", contagem);

// 3. Ordenados por Nota (Decrescente)
const ordenados = ordenarPorNota(filmesIniciais);
console.log("Filmes ordenados por nota (maior -> menor):", ordenados);

// 4. Prova de que o array original não foi alterado (Imutabilidade)
console.log("Array original preservado:", filmesIniciais);