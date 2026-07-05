import type { SupabaseClient } from "@supabase/supabase-js";
import { VehiclePeriodicCheck } from "./vehicle-periodic-check.model";
import type { NewVehiclePeriodicCheckInput, VehiclePeriodicCheckRow } from "./types";

export class VehiclePeriodicCheckRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<VehiclePeriodicCheck[]> {
    const { data, error } = await this.supabase
      .from("vehicle_periodic_checks")
      .select("*, vehicles(plate, make_model)")
      .order("due_date", { ascending: true });

    if (error) throw new Error(`Failed to list periodic checks: ${error.message}`);
    return (data as VehiclePeriodicCheckRow[]).map((row) => new VehiclePeriodicCheck(row));
  }

  async create(input: NewVehiclePeriodicCheckInput): Promise<VehiclePeriodicCheck> {
    const { data, error } = await this.supabase
      .from("vehicle_periodic_checks")
      .insert(input)
      .select("*, vehicles(plate, make_model)")
      .single();

    if (error) throw new Error(`Failed to create periodic check: ${error.message}`);
    return new VehiclePeriodicCheck(data as VehiclePeriodicCheckRow);
  }
}
