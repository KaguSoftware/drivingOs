import type { SupabaseClient } from "@supabase/supabase-js";
import { Student } from "../../admin/(dashboard)/ogrenciler/student.model";
import { PaymentInstallment } from "../../admin/(dashboard)/odemeler/payment-installment.model";
import { Lesson } from "../../admin/(dashboard)/program/lesson.model";
import type { StudentRow } from "../../admin/(dashboard)/ogrenciler/types";
import type { PaymentInstallmentRow } from "../../admin/(dashboard)/odemeler/types";
import type { LessonRow } from "../../admin/(dashboard)/program/types";

const LESSON_SELECT = "*, students(full_name, phone), instructors(full_name), vehicles(plate)";

// Read access for a signed-in student's own data. Rows are already scoped
// by RLS (student_id = current_student_id()); we filter defensively too.
export class PortalRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getStudent(studentId: string): Promise<Student> {
    const { data, error } = await this.supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();
    if (error) throw new Error(`Öğrenci bilgisi yüklenemedi: ${error.message}`);
    return new Student(data as StudentRow);
  }

  async listLessons(studentId: string): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from("lessons")
      .select(LESSON_SELECT)
      .eq("student_id", studentId)
      .order("starts_at", { ascending: true });
    if (error) throw new Error(`Dersler yüklenemedi: ${error.message}`);
    return (data as LessonRow[]).map((row) => new Lesson(row));
  }

  async listInstallments(studentId: string): Promise<PaymentInstallment[]> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .select("*, students(full_name)")
      .eq("student_id", studentId)
      .order("due_date", { ascending: true });
    if (error) throw new Error(`Ödemeler yüklenemedi: ${error.message}`);
    return (data as PaymentInstallmentRow[]).map((row) => new PaymentInstallment(row));
  }
}
