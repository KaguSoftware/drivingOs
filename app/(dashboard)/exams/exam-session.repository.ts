import type { SupabaseClient } from "@supabase/supabase-js";
import { ExamSession } from "./exam-session.model";
import type { ExamSessionRow, NewExamSessionInput } from "./types";

const EXAM_SESSION_SELECT = "*, exam_places(name, address), instructors(full_name)";

export class ExamSessionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForWeek(weekStart: Date, weekEnd: Date): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from("exam_sessions")
      .select(EXAM_SESSION_SELECT)
      .gte("starts_at", weekStart.toISOString())
      .lt("starts_at", weekEnd.toISOString())
      .order("starts_at", { ascending: true });

    if (error) throw new Error(`Failed to list exam sessions: ${error.message}`);
    return (data as ExamSessionRow[]).map((row) => new ExamSession(row));
  }

  async listUpcoming(): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from("exam_sessions")
      .select(EXAM_SESSION_SELECT)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true });

    if (error) throw new Error(`Failed to list exam sessions: ${error.message}`);
    return (data as ExamSessionRow[]).map((row) => new ExamSession(row));
  }

  async findById(id: string): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from("exam_sessions")
      .select(EXAM_SESSION_SELECT)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find exam session: ${error.message}`);
    return new ExamSession(data as ExamSessionRow);
  }

  async create(input: NewExamSessionInput): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from("exam_sessions")
      .insert(input)
      .select(EXAM_SESSION_SELECT)
      .single();

    if (error) throw new Error(`Failed to create exam session: ${error.message}`);
    return new ExamSession(data as ExamSessionRow);
  }
}
