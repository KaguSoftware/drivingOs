"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { buttonClasses } from "@/components/ui/button";

export interface IncomeExpensePoint {
  month: string;
  income: number;
  expense: number;
}

const WINDOW_SIZE = 6;

function formatCurrency(value: number): string {
  return `₺${value.toLocaleString("tr-TR")}`;
}

export function IncomeExpenseChart({ data }: { data: IncomeExpensePoint[] }) {
  const maxStart = Math.max(0, data.length - WINDOW_SIZE);
  const [start, setStart] = useState(maxStart);

  const visible = data.slice(start, start + WINDOW_SIZE);
  const canGoLeft = start > 0;
  const canGoRight = start < maxStart;

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-4">
      <div className="mb-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setStart((value) => Math.max(0, value - WINDOW_SIZE))}
          disabled={!canGoLeft}
          className={buttonClasses("secondary", "px-3 py-1 text-xs")}
        >
          ← Önceki
        </button>
        <button
          type="button"
          onClick={() => setStart((value) => Math.min(maxStart, value + WINDOW_SIZE))}
          disabled={!canGoRight}
          className={buttonClasses("secondary", "px-3 py-1 text-xs")}
        >
          Sonraki →
        </button>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={visible} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
            <YAxis tick={{ fill: "var(--color-muted)", fontSize: 12 }} tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Bar dataKey="income" name="Gelir" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Gider" fill="var(--color-danger)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
