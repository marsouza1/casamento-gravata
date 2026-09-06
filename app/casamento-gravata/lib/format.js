// Formata um número como Real brasileiro. Ex: 500 -> "R$ 500,00"
export function formatBRL(value) {
  const number = Number(value) || 0;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
