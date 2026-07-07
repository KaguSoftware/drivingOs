import type { SupabaseClient } from "@supabase/supabase-js";
import { Instructor } from "./instructor.model";
import type { InstructorRow, NewInstructorInput } from "./types";

export class InstructorRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<Instructor[]> {
    const { data, error } = await this.supabase
      .from("instructors")
      .select("*, vehicles(plate)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list instructors: ${error.message}`);
    return (data as InstructorRow[]).map((row) => new Instructor(row));
  }

  async create(input: NewInstructorInput): Promise<Instructor> {
    const { data, error } = await this.supabase
      .from("instructors")
      .insert(input)
      .select("*, vehicles(plate)")
      .single();

    if (error) throw new Error(`Failed to create instructor: ${error.message}`);
    return new Instructor(data as InstructorRow);
  }

  async findById(id: string): Promise<Instructor> {
    const { data, error } = await this.supabase
      .from("instructors")
      .select("*, vehicles(plate)")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find instructor: ${error.message}`);
    return new Instructor(data as InstructorRow);
  }

  async update(id: string, input: NewInstructorInput): Promise<Instructor> {
    const { data, error } = await this.supabase
      .from("instructors")
      .update(input)
      .eq("id", id)
      .select("*, vehicles(plate)")
      .single();

    if (error) throw new Error(`Failed to update instructor: ${error.message}`);
    return new Instructor(data as InstructorRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("instructors").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete instructor: ${error.message}`);
  }
}
