// Mirrors supabase/migrations/0016_instructor_availability.sql — keep in sync.
// weekday: 0 = Monday … 6 = Sunday.

export const WEEKDAYS = [
  "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar",
] as const;

export interface AvailabilityRow {
  id: string;
  instructor_id: string;
  weekday: number;
  start_time: string;
  end_time: string;
}

export interface BlockedDateRow {
  id: string;
  instructor_id: string;
  blocked_date: string;
  reason: string | null;
}
