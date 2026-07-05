import type { SupabaseClient } from "@supabase/supabase-js";
import { ExamEnrollment } from "./exam-enrollment.model";
import type { ExamEnrollmentRow, NewExamEnrollmentInput } from "./types";

export class ExamEnrollmentRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForSession(examSessionId: string): Promise<ExamEnrollment[]> {
    const { data, error } = await this.supabase
      .from("exam_enrollments")
      .select("*, students(full_name)")
      .eq("exam_session_id", examSessionId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(`Failed to list enrollments: ${error.message}`);
    return (data as ExamEnrollmentRow[]).map((row) => new ExamEnrollment(row));
  }

  async enroll(input: NewExamEnrollmentInput): Promise<ExamEnrollment> {
    const { data, error } = await this.supabase
      .from("exam_enrollments")
      .insert(input)
      .select("*, students(full_name)")
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new Error("Student is already enrolled in this exam session");
      }
      throw new Error(`Failed to enroll student: ${error.message}`);
    }
    return new ExamEnrollment(data as ExamEnrollmentRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("exam_enrollments").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete enrollment: ${error.message}`);
  }
}
