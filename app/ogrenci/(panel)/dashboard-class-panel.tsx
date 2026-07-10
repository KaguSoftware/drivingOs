import Link from "next/link";
import { primaryLinkClass } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WEEKDAYS, MAX_WEEKDAY_PICKS, type ClassTimeRequestRow } from "./ders-tercihleri/types";

function time(hhmmss: string): string {
  return hhmmss.slice(0, 5);
}

export function DashboardClassPanel({ rows }: { rows: ClassTimeRequestRow[] }) {
  const matched = rows.filter((r) => r.status === "matched");
  const activeCount = rows.filter((r) => r.status !== "canceled").length;
  const atLimit = activeCount >= MAX_WEEKDAY_PICKS;

  return (
    <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Ders saatleriniz</p>
        {!atLimit && (
          <Link href="/ogrenci/ders-tercihleri" className={primaryLinkClass}>
            Ders Saati Seç
          </Link>
        )}
      </div>

      {matched.length === 0 ? (
        <p className="text-sm text-muted">Henüz eşleşen bir dersiniz yok.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {matched.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5"
            >
              <div>
                <p className="text-sm font-medium">{WEEKDAYS[row.weekday]}</p>
                <p className="text-xs text-muted">
                  {time(row.startTime)}–{time(row.endTime)} · {row.instructorName ?? "Eğitmen"}
                </p>
              </div>
              <Badge tone="success">Eşleşti</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
