import Link from "next/link";
import { PERIOD_LABELS, TRACKER_PERIODS, type TrackerPeriod } from "./types";

export function PeriodTabs({ active }: { active: TrackerPeriod }) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-1 text-sm">
      {TRACKER_PERIODS.map((period) => (
        <Link
          key={period}
          href={`/admin/egitmen-takip?donem=${period}`}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            period === active
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {PERIOD_LABELS[period]}
        </Link>
      ))}
    </div>
  );
}
