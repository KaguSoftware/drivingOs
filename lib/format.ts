const TRY = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return TRY.format(amount);
}
