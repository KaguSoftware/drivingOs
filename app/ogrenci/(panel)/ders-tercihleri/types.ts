// Mirrors supabase/migrations/0020_class_time_requests.sql — keep in sync.
export { WEEKDAYS } from "@/app/egitmen/(panel)/musaitlik/types";

export type ClassTimeRequestStatus = "pending" | "matched" | "canceled";

export interface ClassTimeRequestRow {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  status: ClassTimeRequestStatus;
  lessonId: string | null;
  wasEverMatched: boolean;
  instructorName: string | null;
}

export const MAX_WEEKDAY_PICKS = 6;
