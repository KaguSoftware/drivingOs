// Buckets financial data into calendar months for the income/expense graph.
// Uses local calendar month (not toISOString) so month boundaries don't
// shift across UTC — all source dates are stored/read as plain dates.

import type { PaymentTransactionRow } from "./types";

export const MONTHS_BACK = 24;

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("tr-TR", {
    month: "short",
    year: "2-digit",
  });
}

export function buildMonthKeys(monthsBack: number = MONTHS_BACK): string[] {
  const now = new Date();
  const keys: string[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    keys.push(monthKey(new Date(now.getFullYear(), now.getMonth() - i, 1)));
  }
  return keys;
}

export function emptyMonthMap(monthKeys: string[]): Record<string, number> {
  return Object.fromEntries(monthKeys.map((key) => [key, 0]));
}

export function addToMonth(map: Record<string, number>, date: Date, amount: number): void {
  const key = monthKey(date);
  if (key in map) map[key] += amount;
}

export function buildIncomeSeries(
  transactions: PaymentTransactionRow[],
  monthKeys: string[]
): Record<string, number> {
  const series = emptyMonthMap(monthKeys);
  for (const transaction of transactions) {
    addToMonth(series, new Date(transaction.paid_at), transaction.amount);
  }
  return series;
}
