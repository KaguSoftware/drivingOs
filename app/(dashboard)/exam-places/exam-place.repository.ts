import type { SupabaseClient } from "@supabase/supabase-js";
import { ExamPlace } from "./exam-place.model";
import type { ExamPlaceRow, NewExamPlaceInput } from "./types";

export class ExamPlaceRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<ExamPlace[]> {
    const { data, error } = await this.supabase
      .from("exam_places")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list exam places: ${error.message}`);
    return (data as ExamPlaceRow[]).map((row) => new ExamPlace(row));
  }

  async findById(id: string): Promise<ExamPlace> {
    const { data, error } = await this.supabase
      .from("exam_places")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find exam place: ${error.message}`);
    return new ExamPlace(data as ExamPlaceRow);
  }

  async create(input: NewExamPlaceInput): Promise<ExamPlace> {
    const { data, error } = await this.supabase
      .from("exam_places")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Failed to create exam place: ${error.message}`);
    return new ExamPlace(data as ExamPlaceRow);
  }
}
