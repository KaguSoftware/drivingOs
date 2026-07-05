// Mirrors supabase/migrations/0001_init.sql (instructors) and
// supabase/migrations/0006_exam_results.sql — keep in sync.

import type { LicenseClass } from "../students/types";

export interface InstructorRow {
  id: string;
  full_name: string;
  phone: string;
  license_classes: LicenseClass[];
  created_at: string;
}

export interface NewInstructorInput {
  full_name: string;
  phone: string;
  license_classes: LicenseClass[];
}

export interface ExamResultRow {
  id: string;
  student_id: string;
  instructor_id: string | null;
  passed: boolean;
  exam_date: string;
  created_at: string;
}
