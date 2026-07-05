"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamSessionRepository } from "./exam-session.repository";
import { ExamEnrollmentRepository } from "./exam-enrollment.repository";

export async function createExamSession(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamSessionRepository(supabase);

  const session = await repository.create({
    exam_place_id: String(formData.get("exam_place_id") ?? ""),
    instructor_id: String(formData.get("instructor_id") ?? ""),
    starts_at: new Date(String(formData.get("starts_at") ?? "")).toISOString(),
    ends_at: new Date(String(formData.get("ends_at") ?? "")).toISOString(),
  });

  revalidatePath("/schedule");
  redirect(`/exams/${session.id}`);
}

export async function enrollStudent(formData: FormData): Promise<void> {
  const examSessionId = String(formData.get("exam_session_id") ?? "");

  const supabase = await createSupabaseServerClient();
  const repository = new ExamEnrollmentRepository(supabase);

  await repository.enroll({
    exam_session_id: examSessionId,
    student_id: String(formData.get("student_id") ?? ""),
  });

  revalidatePath(`/exams/${examSessionId}`);
}
