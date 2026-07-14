import Link from "next/link";
import { Sparkline, type SparkIntent } from "./sparkline";

const INTENT_CHIP: Record<SparkIntent, string> = {
  default: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const DELTA_COLOR = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-muted",
} as const;

export type StatDelta = {
  value: string;
  label?: string;
  direction: "up" | "down" | "flat";
  intent?: keyof typeof DELTA_COLOR;
};

function DeltaBadge({ delta }: { delta: StatDelta }) {
  const intent =
    delta.intent ??
    (delta.direction === "up" ? "positive" : delta.direction === "down" ? "negative" : "neutral");
  const arrow = delta.direction === "up" ? "↑" : delta.direction === "down" ? "↓" : "→";
  return (
    <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${DELTA_COLOR[intent]}`}>
      <span aria-hidden>{arrow}</span>
      <span className="tabular-nums">{delta.value}</span>
      {delta.label && <span className="font-normal text-faint">{delta.label}</span>}
    </p>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  intent = "default",
  delta,
  sparkline,
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  intent?: SparkIntent;
  delta?: StatDelta;
  sparkline?: number[];
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && (
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${INTENT_CHIP[intent]}`}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">{value}</p>
          {delta && <DeltaBadge delta={delta} />}
        </div>
        {sparkline && sparkline.length > 1 && (
          <Sparkline data={sparkline} intent={intent} className="h-9 w-24 shrink-0" />
        )}
      </div>
      {hint && <p className="mt-2 text-xs text-faint">{hint}</p>}
    </>
  );

  const base = "block rounded-xl border border-border bg-surface p-5 shadow-xs";
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} transition-colors hover:border-border-strong hover:bg-surface-strong`}
      >
        {content}
      </Link>
    );
  }
  return <div className={base}>{content}</div>;
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
