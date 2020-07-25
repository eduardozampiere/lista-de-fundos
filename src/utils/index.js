export function formatReal(value, lang = "pt-BR", money = "BRL") {
  if (isNaN(parseFloat(value))) {
    value = 0;
  }
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: money,
  }).format(value);
}

export function formatNumber(value, dec = 2, lang = "pt-BR") {
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(value);
}

export function formatPercent(value, dec = 2) {
  if (!value) return "-";
  return `${formatNumber(value, dec)}%`;
}

export function formatDate(date) {
  return date.split("-").reverse().join("/");
}

export const colors = [
  "#a6ecfc",
  "#68f1dd",
  "#91ed6e",
  "#b0f42a",
  "#ddf40c",
  "#faf00e",
  "#ffdc00",
  "#fb0",
  "#f80",
  "#ff5e00",
  "#ff0600",
  "#b51414",
];
