"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "./exam-place.repository";

export async function createExamPlace(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new ExamPlaceRepository(supabase);

  await repository.create({
    name: String(formData.get("name") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || null,
  });

  revalidatePath("/exam-places");
  redirect("/exam-places");
}
