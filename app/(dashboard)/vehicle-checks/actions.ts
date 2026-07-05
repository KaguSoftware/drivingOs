"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehiclePeriodicCheckRepository } from "./vehicle-periodic-check.repository";
import { CHECK_TYPES, type CheckType } from "./types";

export async function createPeriodicCheck(formData: FormData): Promise<void> {
  const checkType = formData.get("check_type") as string;
  if (!CHECK_TYPES.includes(checkType as CheckType)) {
    throw new Error(`Invalid check type: ${checkType}`);
  }

  const costRaw = String(formData.get("cost") ?? "").trim();

  const supabase = await createSupabaseServerClient();
  const repository = new VehiclePeriodicCheckRepository(supabase);

  await repository.create({
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    check_type: checkType as CheckType,
    due_date: String(formData.get("due_date") ?? ""),
    cost: costRaw ? Number(costRaw) : null,
    provider: String(formData.get("provider") ?? "").trim() || null,
  });

  revalidatePath("/vehicle-checks");
  redirect("/vehicle-checks");
}
