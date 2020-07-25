export function formatReal(value, lang = "pt-BR", money = "BRL") {
  if (isNaN(parseFloat(value))) {
    value = 0;
  }
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: money,
  }).format(value);
}
