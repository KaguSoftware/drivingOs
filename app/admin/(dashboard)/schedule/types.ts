// Mirrors supabase/migrations/0005_lessons.sql — keep in sync.

export const MAX_CONCURRENT_LESSONS = 3;

export interface LessonRow {
  id: string;
  student_id: string;
  instructor_id: string;
  vehicle_id: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  students: { full_name: string; phone: string } | null;
  instructors: { full_name: string } | null;
  vehicles: { plate: string } | null;
}

export interface NewLessonInput {
  student_id: string;
  instructor_id: string;
  vehicle_id: string;
  starts_at: string;
  ends_at: string;
}
