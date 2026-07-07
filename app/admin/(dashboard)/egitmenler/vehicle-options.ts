import type { SupabaseClient } from "@supabase/supabase-js";
import { VehicleRepository } from "../araclar/vehicle.repository";
import type { VehicleOption } from "./tutor-form";

// Vehicle dropdown options for the tutor form's assigned-vehicle select.
export async function loadVehicleOptions(
  supabase: SupabaseClient
): Promise<VehicleOption[]> {
  const vehicles = await new VehicleRepository(supabase).listAll();
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
    label: `${vehicle.plate} · ${vehicle.makeModel}`,
  }));
}
