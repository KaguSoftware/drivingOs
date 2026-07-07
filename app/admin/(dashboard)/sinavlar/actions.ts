"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamSessionRepository } from "./exam-session.repository";
import { ExamEnrollmentRepository } from "./exam-enrollment.repository";
import type { NewExamSessionInput } from "./types";

const EXAM_DURATION_MS = 60 * 60 * 1000;

function parseExamSessionInput(formData: FormData): NewExamSessionInput {
  const startsAt = new Date(String(formData.get("starts_at") ?? ""));

  return {
    exam_place_id: String(formData.get("exam_place_id") ?? ""),
    instructor_id: String(formData.get("instructor_id") ?? ""),
    starts_at: startsAt.toISOString(),
    ends_at: new Date(startsAt.getTime() + EXAM_DURATION_MS).toISOString(),
  };
}

export async function createExamSession(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamSessionRepository(supabase);

  const session = await repository.create(parseExamSessionInput(formData));

  const studentIds = formData.getAll("student_ids").map(String);
  if (studentIds.length > 0) {
    const enrollmentRepository = new ExamEnrollmentRepository(supabase);
    await Promise.all(
      studentIds.map((studentId) =>
        enrollmentRepository.enroll({ exam_session_id: session.id, student_id: studentId }),
      ),
    );
  }

  revalidatePath("/admin/program");
  redirect(`/admin/sinavlar/${session.id}`);
}

export async function updateExamSession(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamSessionRepository(supabase);

  await repository.update(id, parseExamSessionInput(formData));

  revalidatePath("/admin/program");
  revalidatePath("/admin/sinavlar");
  redirect(`/admin/sinavlar/${id}`);
}

export async function deleteExamSession(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamSessionRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/sinavlar");
  revalidatePath("/admin/program");
  redirect("/admin/sinavlar");
}

// Same as deleteExamSession but stays on the current page — used from the
// weekly program calendar, where redirecting to /admin/sinavlar would be
// unexpected.
export async function deleteExamSessionFromProgram(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamSessionRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/sinavlar");
  revalidatePath("/admin/program");
}

export async function enrollStudent(formData: FormData): Promise<void> {
  const examSessionId = String(formData.get("exam_session_id") ?? "");

  const supabase = await createSupabaseServerClient();
  const repository = new ExamEnrollmentRepository(supabase);

  await repository.enroll({
    exam_session_id: examSessionId,
    student_id: String(formData.get("student_id") ?? ""),
  });

  revalidatePath(`/admin/sinavlar/${examSessionId}`);
}

export async function deleteEnrollment(id: string, examSessionId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamEnrollmentRepository(supabase);

  await repository.delete(id);

  revalidatePath(`/admin/sinavlar/${examSessionId}`);
}
