function Estrelas({ nota = 0 }) {
  const valor = Math.max(0, Math.min(5, Number(nota) || 0));
  return <span>{"★".repeat(valor) + "☆".repeat(5 - valor)}</span>;
}

export default Estrelas;