const TRY = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
});

const TRY_COMPACT = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  notation: "compact",
  maximumFractionDigits: 1,
});

const NUM = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

/** Locale-correct Turkish Lira, e.g. ₺12.345,00 — the only money path in the app. */
export function formatCurrency(amount: number): string {
  return TRY.format(amount);
}

/** Compact Lira for tight axes/sparklines, e.g. ₺12,3B. */
export function formatCurrencyCompact(amount: number): string {
  return TRY_COMPACT.format(amount);
}

/** Grouped integer, e.g. 12.345 — for counts, not money. */
export function formatNumber(value: number): string {
  return NUM.format(value);
}
