// Mirrors supabase/migrations/0010_login_and_public_lookup.sql
// lookup_upcoming_exam() — keep in sync.

export interface LookupRpcRow {
  student_full_name: string;
  exam_place_name: string;
  exam_place_address: string;
  exam_place_notes: string | null;
  starts_at: string;
  ends_at: string;
}
