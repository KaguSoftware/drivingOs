"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleViolationRepository } from "./vehicle-violation.repository";
import type { NewVehicleViolationInput } from "./types";

function parseViolationInput(formData: FormData): NewVehicleViolationInput {
  const fineAmountRaw = String(formData.get("fine_amount") ?? "").trim();

  return {
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    violation_type: String(formData.get("violation_type") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    violation_date: String(formData.get("violation_date") ?? ""),
    fine_amount: fineAmountRaw ? Number(fineAmountRaw) : null,
  };
}

export async function createViolation(formData: FormData): Promise<void> {
  const input = parseViolationInput(formData);
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleViolationRepository(supabase);

  await repository.create(input);

  revalidatePath(`/admin/vehicles/${input.vehicle_id}`);
}

export async function updateViolation(id: string, formData: FormData): Promise<void> {
  const input = parseViolationInput(formData);
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleViolationRepository(supabase);

  await repository.update(id, input);

  revalidatePath(`/admin/vehicles/${input.vehicle_id}`);
  redirect(`/admin/vehicles/${input.vehicle_id}`);
}

export async function deleteViolation(id: string, vehicleId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleViolationRepository(supabase);

  await repository.delete(id);

  revalidatePath(`/admin/vehicles/${vehicleId}`);
  redirect(`/admin/vehicles/${vehicleId}`);
}
