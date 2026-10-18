// Tipo de cambio de referencia para mostrar precios aproximados en pesos mexicanos.
// Banxico, sep-2026: ~17.15 MXN por USD. Actualizar a mano si el peso se mueve mucho.
export const USD_TO_MXN = 17.15;

// Convierte un precio en texto ("desde $180 USD", "$45 USD") a su equivalente
// aproximado en MXN, redondeado a la centena. Devuelve null si no hay monto en USD.
export function approxMxn(price: string | undefined): string | null {
  const match = price?.match(/\$\s?([\d.,]+)\s?USD/);
  if (!match) return null;
  const usd = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(usd) || usd <= 0) return null;
  const mxn = Math.round((usd * USD_TO_MXN) / 100) * 100;
  return `≈ $${mxn.toLocaleString('en-US')} MXN`;
}
