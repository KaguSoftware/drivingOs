// Mirrors supabase/migrations/0013_exam_place_video.sql
// lookup_upcoming_exam() — keep in sync.

export interface LookupRpcRow {
  student_full_name: string;
  exam_place_name: string;
  exam_place_address: string;
  exam_place_notes: string | null;
  starts_at: string;
  ends_at: string;
  youtube_url: string | null;
}

// Mirrors supabase/migrations/0011_lookup_student_by_national_id.sql
// lookup_student_by_national_id() — keep in sync.
export interface StudentLookupRpcRow {
  full_name: string;
}
