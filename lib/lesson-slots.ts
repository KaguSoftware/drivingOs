// Fixed 2-hour lesson slot presets used by the admin "hazır saatlerden seç"
// flow (app/admin/(dashboard)/program) and, separately, by a student-facing
// self-service booking flow. Kept here (lib/) since both consumers need it.
//
// Times are wall-clock 24h HH:mm strings. presetSlotToDateRange combines a
// slot with a specific calendar day using the same local-time convention as
// app/admin/(dashboard)/program/lesson-time.ts and the DateTimePicker/DatePicker
// components: Date objects are built from local year/month/date/hour/minute
// (never parsed as UTC), so the resulting Date's instant matches what a user
// picking that day and time in their local timezone would expect.

export interface PresetSlot {
  label: string;
  start: string; // HH:mm, 24h, local wall-clock time
  end: string; // HH:mm, 24h, local wall-clock time
}

export const PRESET_SLOTS: PresetSlot[] = [
  { label: "08:00 - 10:00", start: "08:00", end: "10:00" },
  { label: "10:00 - 12:00", start: "10:00", end: "12:00" },
  { label: "12:30 - 14:30", start: "12:30", end: "14:30" },
  { label: "14:30 - 16:30", start: "14:30", end: "16:30" },
  { label: "16:30 - 18:30", start: "16:30", end: "18:30" },
];

function timeToParts(time: string): { hour: number; minute: number } {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

export function presetSlotToDateRange(
  day: Date,
  slot: { start: string; end: string }
): { startsAt: Date; endsAt: Date } {
  const start = timeToParts(slot.start);
  const end = timeToParts(slot.end);
  const startsAt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), start.hour, start.minute, 0, 0);
  const endsAt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), end.hour, end.minute, 0, 0);
  return { startsAt, endsAt };
}
