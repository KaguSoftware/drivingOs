"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { redirect } from "next/navigation";

const BOOK_ERRORS: Record<string, string> = {
  outside_availability: "Seçtiğiniz saat eğitmenin müsait olduğu saatlerin dışında.",
  date_blocked: "Eğitmen bu gün için kapalı.",
  no_vehicle_assigned: "Bu eğitmene araç atanmadığı için ders alınamıyor.",
  invalid_time: "Geçersiz saat.",
  not_a_student: "Ders almak için öğrenci girişi gerekli.",
};

export async function bookLesson(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const instructorId = String(formData.get("instructor_id") ?? "");
  try {
    await requireRole("student");
    const startsAt = String(formData.get("starts_at") ?? "");
    const endsAt = String(formData.get("ends_at") ?? "");
    if (!instructorId || !startsAt || !endsAt) throw new Error("Eksik bilgi");

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("book_lesson", {
      p_instructor_id: instructorId,
      p_starts_at: startsAt,
      p_ends_at: endsAt,
    });
    if (error) {
      if (error.code === "23P01") throw new Error("Bu saat az önce doldu. Başka bir saat seçin.");
      const key = error.message.match(/[a-z_]+$/)?.[0] ?? "";
      throw new Error(BOOK_ERRORS[key] ?? "Ders alınamadı.");
    }
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/ogrenci/ders-al/${instructorId}`);
  redirect(withToast("/ogrenci/derslerim", "Dersiniz oluşturuldu"));
}
