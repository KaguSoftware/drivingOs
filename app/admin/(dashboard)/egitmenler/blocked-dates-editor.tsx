"use client";

import { useActionState } from "react";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import type { BlockedDateRow } from "../../../egitmen/(panel)/musaitlik/types";
import { addInstructorBlockedDate, removeInstructorBlockedDate } from "./availability-actions";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function BlockedDatesEditor({
  instructorId,
  rows,
}: {
  instructorId: string;
  rows: BlockedDateRow[];
}) {
  const [result, formAction] = useActionState(
    addInstructorBlockedDate.bind(null, instructorId),
    null
  );
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-4">
      <form
        action={formAction}
        className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-end"
      >
        <label className="flex flex-col gap-1 text-sm">
          Tarih
          <input type="date" name="blocked_date" required min={today} className={inputClass} />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Sebep <span className="text-xs text-muted">(opsiyonel)</span>
          <input name="reason" className={inputClass} placeholder="İzin, tatil…" />
        </label>
        <SubmitButton>Günü kapat</SubmitButton>
      </form>
      <FormFeedback result={result} />

      {rows.length === 0 ? (
        <p className="text-sm text-muted">Kapalı gün yok.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 text-sm"
            >
              <div>
                <p className="font-medium">{formatDate(row.blocked_date)}</p>
                {row.reason && <p className="text-xs text-muted">{row.reason}</p>}
              </div>
              <DeleteButton
                action={removeInstructorBlockedDate.bind(null, instructorId, row.id)}
                confirmMessage="Bu gün tekrar açılsın mı?"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-background"
                title="Sil"
              >
                <span className="sr-only">Sil</span>
                <TrashIcon />
              </DeleteButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
