"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Badge } from "@/components/ui/badge";
import { PRESET_SLOTS } from "@/lib/lesson-slots";
import { requestClassTime } from "./actions";
import { WEEKDAYS, MAX_WEEKDAY_PICKS, type ClassTimeRequestRow } from "./types";

// Sunday (index 6 in WEEKDAYS) isn't offered — students pick at most one
// slot per day across Mon–Sat, matching MAX_WEEKDAY_PICKS.
const SELECTABLE_WEEKDAYS = WEEKDAYS.slice(0, 6);

function time(hhmmss: string): string {
  return hhmmss.slice(0, 5);
}

export function ClassTimeGrid({ rows }: { rows: ClassTimeRequestRow[] }) {
  const [result, formAction] = useActionState(requestClassTime, null);
  const byWeekday = new Map(rows.map((r) => [r.weekday, r]));
  const activeCount = rows.filter((r) => r.status !== "canceled").length;
  const atLimit = activeCount >= MAX_WEEKDAY_PICKS;

  return (
    <div className="flex flex-col gap-4">
      <FormFeedback result={result} />
      {SELECTABLE_WEEKDAYS.map((label, weekday) => {
        const row = byWeekday.get(weekday);
        const disabled = !row && atLimit;

        return (
          <div
            key={weekday}
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{label}</p>
              {row?.status === "matched" && (
                <p className="mt-1 text-sm text-muted">
                  {time(row.startTime)}–{time(row.endTime)} · {row.instructorName ?? "Eğitmen"}
                </p>
              )}
              {row?.status === "pending" && (
                <p className="mt-1 text-sm text-muted">
                  {time(row.startTime)}–{time(row.endTime)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {row?.status === "matched" && <Badge tone="success">Eşleşti</Badge>}
              {row?.status === "pending" && <Badge tone="warning">Bekliyor</Badge>}
              {(!row || row.status === "pending") && !disabled && (
                <form action={formAction} className="flex items-center gap-2">
                  <input type="hidden" name="weekday" value={weekday} />
                  <select
                    name="slot_index"
                    defaultValue={0}
                    className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                  >
                    {PRESET_SLOTS.map((slot, i) => (
                      <option key={slot.label} value={i}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  <SubmitButton variant="secondary" pendingText="...">
                    {row ? "Güncelle" : "Seç"}
                  </SubmitButton>
                </form>
              )}
              {disabled && <span className="text-xs text-muted">Sınıra ulaşıldı</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
