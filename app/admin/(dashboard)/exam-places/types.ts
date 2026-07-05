// Mirrors supabase/migrations/0008_exam_places.sql — keep in sync.

export interface ExamPlaceRow {
  id: string;
  name: string;
  address: string;
  notes: string | null;
  created_at: string;
}

export interface NewExamPlaceInput {
  name: string;
  address: string;
  notes: string | null;
}
