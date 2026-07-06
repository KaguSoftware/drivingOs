"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

export async function createExamPlace(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamPlaceRepository(supabase);

  await repository.create(parseExamPlaceInput(formData));

  revalidatePath("/admin/sinav-yerleri");
  redirect("/admin/sinav-yerleri");
}

export async function updateExamPlace(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamPlaceRepository(supabase);

  await repository.update(id, parseExamPlaceInput(formData));

  revalidatePath("/admin/sinav-yerleri");
  redirect("/admin/sinav-yerleri");
}

export async function deleteExamPlace(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamPlaceRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/sinav-yerleri");
  redirect("/admin/sinav-yerleri");
}
