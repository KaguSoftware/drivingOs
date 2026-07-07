// Mirrors supabase/migrations/0001_init.sql (instructors), 0006_exam_results.sql,
// 0015 (email) and 0017 (assigned_vehicle_id) — keep in sync.

import type { LicenseClass } from "../ogrenciler/types";

export interface InstructorRow {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  license_classes: LicenseClass[];
  assigned_vehicle_id: string | null;
  created_at: string;
  vehicles: { plate: string } | null;
}

export interface NewInstructorInput {
  full_name: string;
  phone: string;
  email: string | null;
  license_classes: LicenseClass[];
  assigned_vehicle_id: string | null;
}

export interface ExamResultRow {
  id: string;
  student_id: string;
  instructor_id: string | null;
  passed: boolean;
  exam_date: string;
  created_at: string;
}
