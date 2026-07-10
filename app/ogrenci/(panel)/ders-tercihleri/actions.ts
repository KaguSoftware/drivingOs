"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PRESET_SLOTS } from "@/lib/lesson-slots";
import { actionError, type ActionResult } from "@/lib/action-result";
import { ClassTimeRequestRepository } from "./class-time-request.repository";

const REQUEST_ERRORS: Record<string, string> = {
  not_a_student: "Bu işlem için öğrenci girişi gerekli.",
  invalid_time: "Geçersiz gün veya saat.",
};

export async function requestClassTime(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireRole("student");
    const weekday = Number(formData.get("weekday"));
    const slotIndex = Number(formData.get("slot_index"));
    const slot = PRESET_SLOTS[slotIndex];
    if (!Number.isInteger(weekday) || weekday < 0 || weekday > 5 || !slot) {
      throw new Error("Eksik bilgi");
    }

    const supabase = await createSupabaseServerClient();
    const repo = new ClassTimeRequestRepository(supabase);
    let lessonId: string | null;
    try {
      lessonId = await repo.requestSlot(weekday, slot.start, slot.end);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const key = message.match(/[a-z_]+$/)?.[0] ?? "";
      throw new Error(REQUEST_ERRORS[key] ?? "İstek kaydedilemedi.");
    }

    revalidatePath("/ogrenci/ders-tercihleri");
    return lessonId
      ? { ok: true, message: "Dersiniz eşleşti, bir eğitmen bulundu." }
      : { ok: true, message: "Şu an uygun eğitmen yok, isteğiniz beklemede kalacak." };
  } catch (error) {
    return actionError(error);
  }
}
