import type { SupabaseClient } from "@supabase/supabase-js";
import { Instructor } from "./instructor.model";
import type { InstructorRow, NewInstructorInput } from "./types";

export class InstructorRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<Instructor[]> {
    const { data, error } = await this.supabase
      .from("instructors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list instructors: ${error.message}`);
    return (data as InstructorRow[]).map((row) => new Instructor(row));
  }

  async create(input: NewInstructorInput): Promise<Instructor> {
    const { data, error } = await this.supabase
      .from("instructors")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Failed to create instructor: ${error.message}`);
    return new Instructor(data as InstructorRow);
  }
}
