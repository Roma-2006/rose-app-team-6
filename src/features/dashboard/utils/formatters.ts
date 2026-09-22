const numberFormatter = new Intl.NumberFormat('en-EG');

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}
