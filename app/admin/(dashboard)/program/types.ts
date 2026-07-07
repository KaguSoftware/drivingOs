// Mirrors supabase/migrations/0005_lessons.sql — keep in sync.
// Overlap prevention is now enforced by DB exclusion constraints (0017),
// not an app-level cap.

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

// Plain, serializable shapes for passing into the client-side LessonForm
// (class instances lose their prototype methods across the RSC boundary).
export interface LessonFormStudent {
  id: string;
  fullName: string;
  licenseClasses: string[];
}

export interface LessonFormInstructor {
  id: string;
  fullName: string;
  licenseClasses: string[];
}

export interface LessonFormVehicle {
  id: string;
  plate: string;
  licenseClass: string;
}
