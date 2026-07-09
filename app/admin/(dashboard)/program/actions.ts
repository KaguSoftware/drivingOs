"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { LessonRepository } from "./lesson.repository";
import type { NewLessonInput } from "./types";

function parseLessonInput(formData: FormData): NewLessonInput {
  return {
    student_id: String(formData.get("student_id") ?? ""),
    instructor_id: String(formData.get("instructor_id") ?? ""),
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    starts_at: new Date(String(formData.get("starts_at") ?? "")).toISOString(),
    ends_at: new Date(String(formData.get("ends_at") ?? "")).toISOString(),
  };
}

export async function createLesson(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new LessonRepository(supabase).create(parseLessonInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/program");
  redirect(withToast("/admin/program", "Ders planlandı"));
}

export async function updateLesson(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new LessonRepository(supabase).update(id, parseLessonInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/program");
  redirect(withToast("/admin/program", "Değişiklikler kaydedildi"));
}

export async function deleteLesson(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new LessonRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/program");
}
