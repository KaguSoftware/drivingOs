"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { actionError, type ActionResult } from "@/lib/action-result";
import { AvailabilityRepository } from "./availability.repository";

const PATH = "/egitmen/musaitlik";

export async function addAvailability(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const profile = await requireRole("teacher");
    const weekday = Number(formData.get("weekday"));
    const start = String(formData.get("start_time") ?? "");
    const end = String(formData.get("end_time") ?? "");
    if (!(weekday >= 0 && weekday <= 6)) throw new Error("Geçersiz gün");
    if (!start || !end || end <= start) throw new Error("Bitiş saati başlangıçtan sonra olmalı");

    const supabase = await createSupabaseServerClient();
    await new AvailabilityRepository(supabase).addAvailability(
      profile.instructor_id!,
      weekday,
      start,
      end
    );
  } catch (error) {
    return actionError(error);
  }
  revalidatePath(PATH);
  return { ok: true, message: "Saat eklendi" };
}

export async function removeAvailability(id: string): Promise<void> {
  const profile = await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  await new AvailabilityRepository(supabase).removeAvailability(profile.instructor_id!, id);
  revalidatePath(PATH);
}

export async function addBlockedDate(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const profile = await requireRole("teacher");
    const date = String(formData.get("blocked_date") ?? "");
    const reason = String(formData.get("reason") ?? "").trim();
    if (!date) throw new Error("Tarih seçin");

    const supabase = await createSupabaseServerClient();
    await new AvailabilityRepository(supabase).addBlockedDate(
      profile.instructor_id!,
      date,
      reason || null
    );
  } catch (error) {
    return actionError(error);
  }
  revalidatePath(PATH);
  return { ok: true, message: "Gün kapatıldı" };
}

export async function removeBlockedDate(id: string): Promise<void> {
  const profile = await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  await new AvailabilityRepository(supabase).removeBlockedDate(profile.instructor_id!, id);
  revalidatePath(PATH);
}
