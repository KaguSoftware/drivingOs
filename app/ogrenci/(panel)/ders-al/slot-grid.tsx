"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { EmptyState } from "@/components/ui/empty-state";
import { bookLesson } from "./actions";
import type { OpenSlot } from "./booking.repository";

function dayKey(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function time(iso: string): string {
  return new Date(iso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

// Groups open slots by day and renders each as a one-click booking form.
export function SlotGrid({
  instructorId,
  slots,
}: {
  instructorId: string;
  slots: OpenSlot[];
}) {
  const [result, formAction] = useActionState(bookLesson, null);

  if (slots.length === 0) {
    return (
      <EmptyState
        title="Önümüzdeki 2 hafta için uygun saat yok"
        description="Eğitmen müsaitlik eklediğinde burada görünecek."
      />
    );
  }

  const byDay = new Map<string, OpenSlot[]>();
  for (const slot of slots) {
    const key = dayKey(slot.startsAt);
    byDay.set(key, [...(byDay.get(key) ?? []), slot]);
  }

  return (
    <div className="flex flex-col gap-5">
      <FormFeedback result={result} />
      {Array.from(byDay.entries()).map(([day, daySlots]) => (
        <div key={day}>
          <p className="mb-2 text-sm font-semibold capitalize">{day}</p>
          <div className="flex flex-wrap gap-2">
            {daySlots.map((slot) => (
              <form key={slot.startsAt} action={formAction}>
                <input type="hidden" name="instructor_id" value={instructorId} />
                <input type="hidden" name="starts_at" value={slot.startsAt} />
                <input type="hidden" name="ends_at" value={slot.endsAt} />
                <SubmitButton variant="secondary" pendingText="...">
                  {time(slot.startsAt)}
                </SubmitButton>
              </form>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
