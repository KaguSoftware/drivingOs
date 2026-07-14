import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/format";

type Dir = "up" | "down" | "flat";

function pct(curr: number, prev: number): { value: string; direction: Dir } {
  if (!prev) return { value: curr > 0 ? "yeni" : "—", direction: curr > 0 ? "up" : "flat" };
  const change = Math.round(((curr - prev) / Math.abs(prev)) * 100);
  return {
    value: `${change > 0 ? "+" : ""}${change}%`,
    direction: change > 0 ? "up" : change < 0 ? "down" : "flat",
  };
}

// For expenses, a rise is bad and a fall is good — invert the semantic colour.
function invert(direction: Dir) {
  return direction === "up" ? "negative" : direction === "down" ? "positive" : "neutral";
}

export function FinanceStats({
  income,
  expense,
  monthKeys,
  totalOutstandingDebt,
  studentCount,
}: {
  income: Record<string, number>;
  expense: Record<string, number>;
  monthKeys: string[];
  totalOutstandingDebt: number;
  studentCount: number;
}) {
  const cur = monthKeys[monthKeys.length - 1];
  const prev = monthKeys[monthKeys.length - 2];
  const incomeSeries = monthKeys.map((k) => income[k]);
  const expenseSeries = monthKeys.map((k) => expense[k]);
  const netSeries = monthKeys.map((k) => income[k] - expense[k]);
  const net = income[cur] - expense[cur];
  const label = "geçen aya göre";

  const incomeDelta = pct(income[cur], income[prev]);
  const expenseDelta = pct(expense[cur], expense[prev]);
  const netDelta = pct(net, income[prev] - expense[prev]);

  return (
    <StatGrid>
      <StatCard
        label="Bu ay gelir"
        value={formatCurrency(income[cur])}
        intent="success"
        sparkline={incomeSeries}
        delta={{ ...incomeDelta, label }}
      />
      <StatCard
        label="Bu ay gider"
        value={formatCurrency(expense[cur])}
        intent="danger"
        sparkline={expenseSeries}
        delta={{ ...expenseDelta, label, intent: invert(expenseDelta.direction) }}
      />
      <StatCard
        label="Bu ay net"
        value={formatCurrency(net)}
        intent={net >= 0 ? "success" : "danger"}
        sparkline={netSeries}
        delta={{ ...netDelta, label }}
      />
      <StatCard
        label="Bekleyen öğrenci borcu"
        value={formatCurrency(totalOutstandingDebt)}
        intent={totalOutstandingDebt > 0 ? "warning" : "success"}
        hint={`${studentCount} öğrenci`}
      />
    </StatGrid>
  );
}
