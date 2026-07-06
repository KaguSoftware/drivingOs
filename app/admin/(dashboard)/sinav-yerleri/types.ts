// Mirrors supabase/migrations/0013_exam_place_video.sql — keep in sync.

export interface ExamPlaceRow {
  id: string;
  name: string;
  address: string;
  notes: string | null;
  youtube_url: string | null;
  created_at: string;
}

export interface NewExamPlaceInput {
  name: string;
  address: string;
  notes: string | null;
  youtube_url: string | null;
}
