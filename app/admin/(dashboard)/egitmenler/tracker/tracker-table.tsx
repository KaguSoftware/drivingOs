import Link from "next/link";
import { tableWrapperClass, theadClass, tbodyClass } from "@/components/ui/table-classes";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { formatHours } from "./tracker.repository";
import type { TrackerRow } from "./types";

export function TrackerTable({ rows }: { rows: TrackerRow[] }) {
  if (rows.length === 0) {
    return <EmptyState title="Henüz eğitmen yok" description="Eğitmen ekleyince takibi burada görünür." />;
  }

  return (
    <>
      {/* Desktop table */}
      <div className={`${tableWrapperClass} hidden md:block`}>
        <table className="w-full text-left text-sm">
          <thead className={theadClass}>
            <tr>
              <th className="px-4 py-3 font-medium">Eğitmen</th>
              <th className="px-4 py-3 font-medium">Araç</th>
              <th className="px-4 py-3 font-medium">Ders sayısı</th>
              <th className="px-4 py-3 font-medium">Toplam süre</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className={tbodyClass}>
            {rows.map((row) => (
              <tr key={row.instructorId}>
                <td className="px-4 py-3 font-medium">{row.fullName}</td>
                <td className="px-4 py-3">
                  {row.vehiclePlate ? <Badge tone="info">{row.vehiclePlate}</Badge> : "—"}
                </td>
                <td className="px-4 py-3">{row.lessonCount}</td>
                <td className="px-4 py-3">{formatHours(row.totalMinutes)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/egitmenler/tracker/${row.instructorId}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <Link
            key={row.instructorId}
            href={`/admin/egitmenler/tracker/${row.instructorId}`}
            className="rounded-xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{row.fullName}</p>
              {row.vehiclePlate && <Badge tone="info">{row.vehiclePlate}</Badge>}
            </div>
            <p className="mt-2 text-sm text-muted">
              {row.lessonCount} ders · {formatHours(row.totalMinutes)}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
