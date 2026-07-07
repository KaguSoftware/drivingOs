import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { assertNotPast } from "@/lib/scheduling-guards";
import { Lesson } from "./lesson.model";
import type { LessonRow, NewLessonInput } from "./types";

const LESSON_SELECT = "*, students(full_name, phone), instructors(full_name), vehicles(plate)";

// Postgres raises exclusion_violation (23P01) when the no-overlap constraints
// added in migration 0017 reject a lesson. Turn it into a readable message.
function translateOverlap(error: PostgrestError): Error {
  if (error.code === "23P01") {
    return new Error(
      "Bu saat aralığında eğitmen veya araç zaten dolu. Farklı bir saat seçin."
    );
  }
  return new Error(error.message);
}

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

  async listForInstructor(
    instructorId: string,
    from?: Date,
    to?: Date
  ): Promise<Lesson[]> {
    let query = this.supabase
      .from("lessons")
      .select(LESSON_SELECT)
      .eq("instructor_id", instructorId);
    if (from) query = query.gte("starts_at", from.toISOString());
    if (to) query = query.lt("starts_at", to.toISOString());

    const { data, error } = await query.order("starts_at", { ascending: true });
    if (error) throw new Error(`Failed to list instructor lessons: ${error.message}`);
    return (data as LessonRow[]).map((row) => new Lesson(row));
  }

  async create(input: NewLessonInput): Promise<Lesson> {
    assertNotPast(input.starts_at);

    const { data, error } = await this.supabase
      .from("lessons")
      .insert(input)
      .select(LESSON_SELECT)
      .single();

    if (error) throw translateOverlap(error);
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

    const { data, error } = await this.supabase
      .from("lessons")
      .update(input)
      .eq("id", id)
      .select(LESSON_SELECT)
      .single();

    if (error) throw translateOverlap(error);
    return new Lesson(data as LessonRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("lessons").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete lesson: ${error.message}`);
  }
}
