import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamResultRow } from "./types";

export interface InstructorStats {
  total: number;
  passed: number;
}

export class ExamResultRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async passRateByInstructor(): Promise<Map<string, InstructorStats>> {
    const { data, error } = await this.supabase
      .from("exam_results")
      .select("instructor_id, passed");

    if (error) throw new Error(`Failed to load exam results: ${error.message}`);

    const stats = new Map<string, InstructorStats>();
    for (const row of data as Pick<ExamResultRow, "instructor_id" | "passed">[]) {
      if (!row.instructor_id) continue;
      const current = stats.get(row.instructor_id) ?? { total: 0, passed: 0 };
      current.total += 1;
      if (row.passed) current.passed += 1;
      stats.set(row.instructor_id, current);
    }
    return stats;
  }
}
