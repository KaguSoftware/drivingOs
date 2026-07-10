import type { SupabaseClient } from "@supabase/supabase-js";
import type { ClassTimeRequestRow } from "./types";

interface ClassTimeRequestQueryRow {
  id: string;
  weekday: number;
  start_time: string;
  end_time: string;
  status: ClassTimeRequestRow["status"];
  lesson_id: string | null;
  was_ever_matched: boolean;
  lessons: { instructors: { full_name: string } | null } | null;
}

// Data access for a student's weekly class-time preferences and the RPC
// that auto-matches them to any available instructor.
export class ClassTimeRequestRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForStudent(studentId: string): Promise<ClassTimeRequestRow[]> {
    const { data, error } = await this.supabase
      .from("class_time_requests")
      .select(
        "id, weekday, start_time, end_time, status, lesson_id, was_ever_matched, lessons(instructors(full_name))"
      )
      .eq("student_id", studentId)
      .order("weekday");
    if (error) throw new Error(`Ders tercihleri yüklenemedi: ${error.message}`);
    return (data as unknown as ClassTimeRequestQueryRow[]).map((row) => ({
      id: row.id,
      weekday: row.weekday,
      startTime: row.start_time,
      endTime: row.end_time,
      status: row.status,
      lessonId: row.lesson_id,
      wasEverMatched: row.was_ever_matched,
      instructorName: row.lessons?.instructors?.full_name ?? null,
    }));
  }

  // Returns the matched lesson id, or null if no instructor was available
  // (the request stays pending).
  async requestSlot(weekday: number, startTime: string, endTime: string): Promise<string | null> {
    const { data, error } = await this.supabase.rpc("book_lesson_any_instructor", {
      p_weekday: weekday,
      p_start_time: startTime,
      p_end_time: endTime,
    });
    if (error) throw error;
    return (data as string | null) ?? null;
  }
}
