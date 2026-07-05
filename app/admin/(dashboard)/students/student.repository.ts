import type { SupabaseClient } from "@supabase/supabase-js";
import { Student } from "./student.model";
import type { NewStudentInput, StudentRow } from "./types";

export class StudentRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<Student[]> {
    const { data, error } = await this.supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list students: ${error.message}`);
    return (data as StudentRow[]).map((row) => new Student(row));
  }

  async findById(id: string): Promise<Student> {
    const { data, error } = await this.supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find student: ${error.message}`);
    return new Student(data as StudentRow);
  }

  async create(input: NewStudentInput): Promise<Student> {
    const { data, error } = await this.supabase
      .from("students")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Failed to create student: ${error.message}`);
    return new Student(data as StudentRow);
  }

  async update(id: string, input: NewStudentInput): Promise<Student> {
    const { data, error } = await this.supabase
      .from("students")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update student: ${error.message}`);
    return new Student(data as StudentRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("students").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete student: ${error.message}`);
  }
}
