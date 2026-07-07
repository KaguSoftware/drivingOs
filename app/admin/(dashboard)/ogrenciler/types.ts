// Mirrors supabase/migrations/0001_init.sql + 0015 (multi-license, email) —
// keep in sync.

export const LICENSE_CLASSES = [
  "A1", "A2", "A", "B1", "B", "C1", "C", "D1", "D", "BE", "F", "M",
] as const;
export type LicenseClass = (typeof LICENSE_CLASSES)[number];

export const PROGRESS_STATUSES = [
  "not_started",
  "in_progress",
  "completed",
] as const;
export type ProgressStatus = (typeof PROGRESS_STATUSES)[number];

export const MEB_STATUSES = [
  "missing_documents",
  "submitted",
  "approved",
  "rejected",
] as const;
export type MebStatus = (typeof MEB_STATUSES)[number];

export interface StudentRow {
  id: string;
  full_name: string;
  phone: string;
  national_id: string;
  email: string | null;
  license_classes: LicenseClass[];
  theory_status: ProgressStatus;
  practice_status: ProgressStatus;
  meb_paperwork_status: MebStatus;
  created_at: string;
}

export interface NewStudentInput {
  full_name: string;
  phone: string;
  national_id: string;
  email: string | null;
  license_classes: LicenseClass[];
}
