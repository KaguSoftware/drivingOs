// Mirrors supabase/migrations/0009_exam_sessions.sql — keep in sync.

export interface ExamSessionRow {
  id: string;
  exam_place_id: string;
  instructor_id: string | null;
  starts_at: string;
  ends_at: string;
  created_at: string;
  exam_places: { name: string; address: string } | null;
  instructors: { full_name: string } | null;
}

export interface NewExamSessionInput {
  exam_place_id: string;
  instructor_id: string;
  starts_at: string;
  ends_at: string;
}

export interface ExamEnrollmentRow {
  id: string;
  exam_session_id: string;
  student_id: string;
  created_at: string;
  students: { full_name: string } | null;
  exam_sessions?: {
    starts_at: string;
    exam_places: { name: string } | null;
  } | null;
}

export interface NewExamEnrollmentInput {
  exam_session_id: string;
  student_id: string;
}

// Plain, serializable shapes for passing into the client-side
// ExamSessionForm (class instances lose their prototype methods across the
// RSC boundary).
export interface ExamSessionFormPlace {
  id: string;
  name: string;
}

export interface ExamSessionFormInstructor {
  id: string;
  fullName: string;
}

export interface ExamSessionFormStudent {
  id: string;
  fullName: string;
}

export interface ExamSessionFormSession {
  id: string;
  examPlaceId: string;
  instructorId: string | null;
  startsAt: string;
}
