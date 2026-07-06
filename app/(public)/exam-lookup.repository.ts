import type { SupabaseClient } from "@supabase/supabase-js";
import { UpcomingExam } from "./exam-lookup.model";
import type { LookupRpcRow, StudentLookupRpcRow } from "./types";

export class ExamLookupRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findUpcomingExam(nationalId: string): Promise<UpcomingExam[]> {
    const { data, error } = await this.supabase.rpc("lookup_upcoming_exam", {
      p_national_id: nationalId,
    });

    if (error) throw new Error(`Failed to look up exam: ${error.message}`);
    return (data as LookupRpcRow[]).map((row) => new UpcomingExam(row));
  }

  async findStudentFullName(nationalId: string): Promise<string | null> {
    const { data, error } = await this.supabase.rpc("lookup_student_by_national_id", {
      p_national_id: nationalId,
    });

    if (error) throw new Error(`Failed to look up student: ${error.message}`);
    const rows = data as StudentLookupRpcRow[];
    return rows[0]?.full_name ?? null;
  }
}
