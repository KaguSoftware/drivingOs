"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

export async function createVehicle(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleRepository(supabase);

  await repository.create(parseVehicleInput(formData));

  revalidatePath("/admin/vehicles");
  redirect("/admin/vehicles");
}

export async function updateVehicle(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleRepository(supabase);

  await repository.update(id, parseVehicleInput(formData));

  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${id}`);
  redirect("/admin/vehicles");
}

export async function deleteVehicle(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new VehicleRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/vehicles");
}
