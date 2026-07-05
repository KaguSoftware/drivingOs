"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LessonRepository } from "./lesson.repository";

export async function createLesson(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new LessonRepository(supabase);

  await repository.create({
    student_id: String(formData.get("student_id") ?? ""),
    instructor_id: String(formData.get("instructor_id") ?? ""),
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    starts_at: new Date(String(formData.get("starts_at") ?? "")).toISOString(),
    ends_at: new Date(String(formData.get("ends_at") ?? "")).toISOString(),
  });

  revalidatePath("/schedule");
  redirect("/schedule");
}
