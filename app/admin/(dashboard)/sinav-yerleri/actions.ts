"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { ExamPlaceRepository } from "./exam-place.repository";
import type { NewExamPlaceInput } from "./types";

function parseExamPlaceInput(formData: FormData): NewExamPlaceInput {
  return {
    name: String(formData.get("name") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || null,
    youtube_url: String(formData.get("youtube_url") ?? "").trim() || null,
  };
}

export async function createExamPlace(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new ExamPlaceRepository(supabase).create(parseExamPlaceInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/sinav-yerleri");
  redirect(withToast("/admin/sinav-yerleri", "Sınav yeri eklendi"));
}

export async function updateExamPlace(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new ExamPlaceRepository(supabase).update(id, parseExamPlaceInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/sinav-yerleri");
  redirect(withToast("/admin/sinav-yerleri", "Değişiklikler kaydedildi"));
}

export async function deleteExamPlace(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamPlaceRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/sinav-yerleri");
  redirect("/admin/sinav-yerleri");
}
