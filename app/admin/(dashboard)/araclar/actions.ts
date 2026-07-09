"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { VehicleRepository } from "./vehicle.repository";
import { isValidPlate } from "./plate";
import {
  LICENSE_CLASSES,
  TRANSMISSIONS,
  type LicenseClass,
  type NewVehicleInput,
  type Transmission,
} from "./types";

function parseVehicleInput(formData: FormData): NewVehicleInput {
  const transmission = formData.get("transmission") as string;
  if (!TRANSMISSIONS.includes(transmission as Transmission)) {
    throw new Error(`Geçersiz vites türü: ${transmission}`);
  }

  const licenseClass = formData.get("license_class") as string;
  if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
    throw new Error(`Invalid license class: ${licenseClass}`);
  }

  const plate = String(formData.get("plate") ?? "").trim();
  if (!isValidPlate(plate)) {
    throw new Error(`Geçersiz plaka: ${plate}`);
  }

  return {
    plate,
    make_model: [
      String(formData.get("make") ?? "").trim(),
      String(formData.get("model") ?? "").trim(),
    ]
      .filter(Boolean)
      .join(" "),
    transmission: transmission as Transmission,
    license_class: licenseClass as LicenseClass,
  };
}

export async function createVehicle(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new VehicleRepository(supabase).create(parseVehicleInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/araclar");
  redirect(withToast("/admin/araclar", "Araç eklendi"));
}

export async function updateVehicle(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new VehicleRepository(supabase).update(id, parseVehicleInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/araclar");
  revalidatePath(`/admin/araclar/${id}`);
  redirect(withToast("/admin/araclar", "Değişiklikler kaydedildi"));
}

export async function deleteVehicle(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/araclar");
  redirect("/admin/araclar");
}
