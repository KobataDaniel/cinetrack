const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function Badge({ status }) {
  const rotulo = ROTULOS[status] ?? status;

  return <span className={`badge ${status}`}>{rotulo}</span>;
}

export default Badge;