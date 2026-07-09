"use client";

import { useActionState } from "react";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { addAvailability, removeAvailability } from "./actions";
import { WEEKDAYS, type AvailabilityRow } from "./types";

export function WeeklyHoursForm({ rows }: { rows: AvailabilityRow[] }) {
  const [result, formAction] = useActionState(addAvailability, null);

  const byDay = WEEKDAYS.map((label, weekday) => ({
    label,
    weekday,
    slots: rows.filter((r) => r.weekday === weekday),
  }));

  return (
    <div className="flex flex-col gap-5">
      <form
        action={formAction}
        className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-end"
      >
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Gün
          <select name="weekday" className={inputClass} defaultValue="0">
            {WEEKDAYS.map((label, weekday) => (
              <option key={weekday} value={weekday}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Başlangıç
          <input type="time" name="start_time" required defaultValue="09:00" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Bitiş
          <input type="time" name="end_time" required defaultValue="17:00" className={inputClass} />
        </label>
        <SubmitButton>Ekle</SubmitButton>
      </form>
      <FormFeedback result={result} />

      <div className="grid gap-3 sm:grid-cols-2">
        {byDay.map((day) => (
          <div key={day.weekday} className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-2 text-sm font-semibold">{day.label}</p>
            {day.slots.length === 0 ? (
              <p className="text-xs text-muted">Kapalı</p>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {day.slots.map((slot) => (
                  <li key={slot.id} className="flex items-center justify-between text-sm">
                    <span>
                      {slot.start_time.slice(0, 5)} – {slot.end_time.slice(0, 5)}
                    </span>
                    <DeleteButton
                      action={removeAvailability.bind(null, slot.id)}
                      confirmMessage="Bu saat aralığı silinsin mi?"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-danger transition-colors hover:bg-background"
                      title="Sil"
                    >
                      <span className="sr-only">Sil</span>
                      <TrashIcon className="h-3.5 w-3.5" />
                    </DeleteButton>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
