import type { SupabaseClient } from "@supabase/supabase-js";
import { assertNotPast } from "@/lib/scheduling-guards";
import { Lesson } from "./lesson.model";
import { MAX_CONCURRENT_LESSONS, type LessonRow, type NewLessonInput } from "./types";

const LESSON_SELECT = "*, students(full_name, phone), instructors(full_name), vehicles(plate)";

export class LessonRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForWeek(weekStart: Date, weekEnd: Date): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from("lessons")
      .select(LESSON_SELECT)
      .gte("starts_at", weekStart.toISOString())
      .lt("starts_at", weekEnd.toISOString())
      .order("starts_at", { ascending: true });

    if (error) throw new Error(`Failed to list lessons: ${error.message}`);
    return (data as LessonRow[]).map((row) => new Lesson(row));
  }

  async create(input: NewLessonInput): Promise<Lesson> {
    assertNotPast(input.starts_at);

    // App-level concurrency rule: at most MAX_CONCURRENT_LESSONS lessons may
    // overlap the same time window (one per vehicle). Not enforced by a DB
    // constraint (no btree_gist precedent in this codebase), so there is a
    // small race-condition window between this check and the insert below.
    const { count, error: countError } = await this.supabase
      .from("lessons")
      .select("id", { count: "exact", head: true })
      .lt("starts_at", input.ends_at)
      .gt("ends_at", input.starts_at);

    if (countError) throw new Error(`Failed to check schedule: ${countError.message}`);
    if ((count ?? 0) >= MAX_CONCURRENT_LESSONS) {
      throw new Error("Time slot is fully booked (3 vehicles already scheduled)");
    }

    const { data, error } = await this.supabase
      .from("lessons")
      .insert(input)
      .select(LESSON_SELECT)
      .single();

    if (error) throw new Error(`Failed to create lesson: ${error.message}`);
    return new Lesson(data as LessonRow);
  }

  async findById(id: string): Promise<Lesson> {
    const { data, error } = await this.supabase
      .from("lessons")
      .select(LESSON_SELECT)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find lesson: ${error.message}`);
    return new Lesson(data as LessonRow);
  }

  async update(id: string, input: NewLessonInput): Promise<Lesson> {
    assertNotPast(input.starts_at);

    const { count, error: countError } = await this.supabase
      .from("lessons")
      .select("id", { count: "exact", head: true })
      .neq("id", id)
      .lt("starts_at", input.ends_at)
      .gt("ends_at", input.starts_at);

    if (countError) throw new Error(`Failed to check schedule: ${countError.message}`);
    if ((count ?? 0) >= MAX_CONCURRENT_LESSONS) {
      throw new Error("Time slot is fully booked (3 vehicles already scheduled)");
    }

    const { data, error } = await this.supabase
      .from("lessons")
      .update(input)
      .eq("id", id)
      .select(LESSON_SELECT)
      .single();

    if (error) throw new Error(`Failed to update lesson: ${error.message}`);
    return new Lesson(data as LessonRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("lessons").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete lesson: ${error.message}`);
  }
}
