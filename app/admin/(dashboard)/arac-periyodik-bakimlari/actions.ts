"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { VehiclePeriodicCheckRepository } from "./vehicle-periodic-check.repository";
import { CHECK_TYPES, type CheckType, type NewVehiclePeriodicCheckInput } from "./types";

function parsePeriodicCheckInput(formData: FormData): NewVehiclePeriodicCheckInput {
  const checkType = formData.get("check_type") as string;
  if (!CHECK_TYPES.includes(checkType as CheckType)) {
    throw new Error(`Geçersiz kontrol türü: ${checkType}`);
  }

  const costRaw = String(formData.get("cost") ?? "").trim();

  return {
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    check_type: checkType as CheckType,
    due_date: String(formData.get("due_date") ?? ""),
    cost: costRaw ? Number(costRaw) : null,
    provider: String(formData.get("provider") ?? "").trim() || null,
  };
}

export async function createPeriodicCheck(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new VehiclePeriodicCheckRepository(supabase).create(parsePeriodicCheckInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/arac-periyodik-bakimlari");
  redirect(withToast("/admin/arac-periyodik-bakimlari", "Kontrol eklendi"));
}

export async function updatePeriodicCheck(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new VehiclePeriodicCheckRepository(supabase).update(id, parsePeriodicCheckInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/arac-periyodik-bakimlari");
  redirect(withToast("/admin/arac-periyodik-bakimlari", "Değişiklikler kaydedildi"));
}

export async function deletePeriodicCheck(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehiclePeriodicCheckRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/arac-periyodik-bakimlari");
  redirect("/admin/arac-periyodik-bakimlari");
}
