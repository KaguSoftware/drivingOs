"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "./vehicle.repository";
import { VehicleDamageRecordRepository } from "./vehicle-damage-record.repository";
import { VehicleViolationRepository } from "./vehicle-violation.repository";
import { isValidPlate } from "./plate";
import {
  DAMAGE_STATUSES,
  LICENSE_CLASSES,
  TRANSMISSIONS,
  type DamageStatus,
  type LicenseClass,
  type Transmission,
} from "./types";

export async function createVehicle(formData: FormData): Promise<void> {
  const transmission = formData.get("transmission") as string;
  if (!TRANSMISSIONS.includes(transmission as Transmission)) {
    throw new Error(`Invalid transmission: ${transmission}`);
  }

  const licenseClass = formData.get("license_class") as string;
  if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
    throw new Error(`Invalid license class: ${licenseClass}`);
  }

  const plate = String(formData.get("plate") ?? "").trim();
  if (!isValidPlate(plate)) {
    throw new Error(`Invalid plate: ${plate}`);
  }

  const supabase = await createSupabaseServerClient();
  const repository = new VehicleRepository(supabase);

  await repository.create({
    plate,
    make_model: [
      String(formData.get("make") ?? "").trim(),
      String(formData.get("model") ?? "").trim(),
    ]
      .filter(Boolean)
      .join(" "),
    transmission: transmission as Transmission,
    license_class: licenseClass as LicenseClass,
  });

  revalidatePath("/vehicles");
  redirect("/vehicles");
}

export async function createDamageRecord(formData: FormData): Promise<void> {
  const vehicleId = String(formData.get("vehicle_id") ?? "");
  const status = formData.get("status") as string;
  if (!DAMAGE_STATUSES.includes(status as DamageStatus)) {
    throw new Error(`Invalid damage status: ${status}`);
  }

  const supabase = await createSupabaseServerClient();
  const repository = new VehicleDamageRecordRepository(supabase);

  await repository.create({
    vehicle_id: vehicleId,
    part_name: String(formData.get("part_name") ?? "").trim(),
    status: status as DamageStatus,
    notes: String(formData.get("notes") ?? "").trim() || null,
  });

  revalidatePath(`/vehicles/${vehicleId}`);
}

export async function createViolation(formData: FormData): Promise<void> {
  const vehicleId = String(formData.get("vehicle_id") ?? "");
  const fineAmountRaw = String(formData.get("fine_amount") ?? "").trim();

  const supabase = await createSupabaseServerClient();
  const repository = new VehicleViolationRepository(supabase);

  await repository.create({
    vehicle_id: vehicleId,
    violation_type: String(formData.get("violation_type") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    violation_date: String(formData.get("violation_date") ?? ""),
    fine_amount: fineAmountRaw ? Number(fineAmountRaw) : null,
  });

  revalidatePath(`/vehicles/${vehicleId}`);
}
