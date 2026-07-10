"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { actionError, type ActionResult } from "@/lib/action-result";
import { AvailabilityRepository } from "../../../egitmen/(panel)/musaitlik/availability.repository";

function editPath(instructorId: string): string {
  return `/admin/egitmenler/${instructorId}/duzenle`;
}

export async function addInstructorAvailability(
  instructorId: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireRole("admin");
    const weekday = Number(formData.get("weekday"));
    const start = String(formData.get("start_time") ?? "");
    const end = String(formData.get("end_time") ?? "");
    if (!(weekday >= 0 && weekday <= 6)) throw new Error("Geçersiz gün");
    if (!start || !end || end <= start) throw new Error("Bitiş saati başlangıçtan sonra olmalı");

    const supabase = await createSupabaseServerClient();
    await new AvailabilityRepository(supabase).addAvailability(instructorId, weekday, start, end);
  } catch (error) {
    return actionError(error);
  }
  revalidatePath(editPath(instructorId));
  return { ok: true, message: "Saat eklendi" };
}

export async function removeInstructorAvailability(instructorId: string, id: string): Promise<void> {
  await requireRole("admin");
  const supabase = await createSupabaseServerClient();
  await new AvailabilityRepository(supabase).removeAvailability(instructorId, id);
  revalidatePath(editPath(instructorId));
}

export async function addInstructorBlockedDate(
  instructorId: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireRole("admin");
    const date = String(formData.get("blocked_date") ?? "");
    const reason = String(formData.get("reason") ?? "").trim();
    if (!date) throw new Error("Tarih seçin");

    const supabase = await createSupabaseServerClient();
    await new AvailabilityRepository(supabase).addBlockedDate(instructorId, date, reason || null);
  } catch (error) {
    return actionError(error);
  }
  revalidatePath(editPath(instructorId));
  return { ok: true, message: "Gün kapatıldı" };
}

export async function removeInstructorBlockedDate(instructorId: string, id: string): Promise<void> {
  await requireRole("admin");
  const supabase = await createSupabaseServerClient();
  await new AvailabilityRepository(supabase).removeBlockedDate(instructorId, id);
  revalidatePath(editPath(instructorId));
}
