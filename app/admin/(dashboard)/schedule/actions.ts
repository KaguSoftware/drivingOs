"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

export async function createLesson(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new LessonRepository(supabase);

  await repository.create(parseLessonInput(formData));

  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function updateLesson(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new LessonRepository(supabase);

  await repository.update(id, parseLessonInput(formData));

  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function deleteLesson(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new LessonRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/schedule");
}
