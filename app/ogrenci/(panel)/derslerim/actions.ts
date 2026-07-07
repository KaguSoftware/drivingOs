"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";

const CANCEL_ERRORS: Record<string, string> = {
  cannot_cancel: "Ders başlamasına 24 saatten az kaldığı için iptal edilemez.",
  not_a_student: "Bu işlem için öğrenci girişi gerekli.",
};

export async function cancelLesson(lessonId: string): Promise<void> {
  await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("cancel_lesson", { p_lesson_id: lessonId });
  if (error) {
    const key = error.message.match(/[a-z_]+$/)?.[0] ?? "";
    throw new Error(CANCEL_ERRORS[key] ?? "Ders iptal edilemedi.");
  }
  revalidatePath("/ogrenci/derslerim");
}
