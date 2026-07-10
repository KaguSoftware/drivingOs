"use client";

import { useActionState, useState } from "react";
import { createLesson } from "./actions";
import { DatePicker } from "@/components/ui/date-picker";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { LessonParticipantFields } from "./lesson-participant-fields";
import { PRESET_SLOTS, presetSlotToDateRange } from "@/lib/lesson-slots";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

function toDateValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
}

function parseDateValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function PresetSlotPicker({
  students,
  instructors,
  vehicles,
  defaultStartsAt,
}: {
  students: LessonFormStudent[];
  instructors: LessonFormInstructor[];
  vehicles: LessonFormVehicle[];
  defaultStartsAt?: string;
}) {
  const [result, formAction] = useActionState(createLesson, null);
  const [vehicleId, setVehicleId] = useState("");
  const [dayValue, setDayValue] = useState(() =>
    toDateValue(defaultStartsAt ? new Date(defaultStartsAt) : new Date())
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const day = parseDateValue(dayValue);
  const selectedSlot = selectedIndex === null ? null : PRESET_SLOTS[selectedIndex];
  const range = selectedSlot ? presetSlotToDateRange(day, selectedSlot) : null;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <LessonParticipantFields
          students={students}
          instructors={instructors}
          vehicles={vehicles}
          vehicleId={vehicleId}
          onVehicleChange={setVehicleId}
        />
        <label className="flex flex-col gap-1 text-sm">
          Gün
          <DatePicker name="day" defaultValue={dayValue} onValueChange={setDayValue} required />
        </label>
        <div className="flex flex-col gap-1 text-sm">
          Saat aralığı
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PRESET_SLOTS.map((slot, index) => (
              <button
                key={slot.label}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                  selectedIndex === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface hover:bg-background/60"
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <input type="hidden" name="starts_at" value={range ? range.startsAt.toISOString() : ""} />
      <input type="hidden" name="ends_at" value={range ? range.endsAt.toISOString() : ""} />
      <FormFeedback result={result} />
      {selectedSlot ? (
        <SubmitButton>Ders planla</SubmitButton>
      ) : (
        <p className="text-sm text-muted">Devam etmek için bir saat aralığı seçin.</p>
      )}
    </form>
  );
}
