import type { SupabaseClient } from "@supabase/supabase-js";
import { UpcomingExam } from "./exam-lookup.model";
import type { LookupRpcRow } from "./types";

export class ExamLookupRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findUpcomingExam(nationalId: string): Promise<UpcomingExam[]> {
    const { data, error } = await this.supabase.rpc("lookup_upcoming_exam", {
      p_national_id: nationalId,
    });

    if (error) throw new Error(`Failed to look up exam: ${error.message}`);
    return (data as LookupRpcRow[]).map((row) => new UpcomingExam(row));
  }

  async nationalIdExists(nationalId: string): Promise<boolean> {
    const { data, error } = await this.supabase.rpc("national_id_exists", {
      p_national_id: nationalId,
    });

    if (error) throw new Error(`Failed to check national id: ${error.message}`);
    return Boolean(data);
  }
}
