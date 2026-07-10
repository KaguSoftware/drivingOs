"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleDamageRecordRepository } from "./vehicle-damage-record.repository";
import { DAMAGE_STATUSES, type DamageStatus, type NewVehicleDamageRecordInput } from "./types";

function parseDamageRecordInput(formData: FormData): NewVehicleDamageRecordInput {
  const vehicleId = String(formData.get("vehicle_id") ?? "");
  const status = formData.get("status") as string;
  if (!DAMAGE_STATUSES.includes(status as DamageStatus)) {
    throw new Error(`Invalid damage status: ${status}`);
  }

  return {
    vehicle_id: vehicleId,
    part_name: String(formData.get("part_name") ?? "").trim(),
    status: status as DamageStatus,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function createDamageRecord(formData: FormData): Promise<void> {
  const input = parseDamageRecordInput(formData);
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleDamageRecordRepository(supabase);

  await repository.create(input);

  revalidatePath(`/admin/araclar/${input.vehicle_id}`);
  revalidatePath("/admin/araclar");
}

export async function updateDamageRecord(id: string, formData: FormData): Promise<void> {
  const input = parseDamageRecordInput(formData);
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleDamageRecordRepository(supabase);

  await repository.update(id, input);

  revalidatePath(`/admin/araclar/${input.vehicle_id}`);
  redirect(`/admin/araclar/${input.vehicle_id}`);
}

export async function deleteDamageRecord(id: string, vehicleId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleDamageRecordRepository(supabase);

  await repository.delete(id);

  revalidatePath(`/admin/araclar/${vehicleId}`);
  redirect(`/admin/araclar/${vehicleId}`);
}
