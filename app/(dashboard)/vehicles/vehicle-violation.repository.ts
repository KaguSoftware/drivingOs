import type { SupabaseClient } from "@supabase/supabase-js";
import { VehicleViolation } from "./vehicle-violation.model";
import type { NewVehicleViolationInput, VehicleViolationRow } from "./types";

export class VehicleViolationRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForVehicle(vehicleId: string): Promise<VehicleViolation[]> {
    const { data, error } = await this.supabase
      .from("vehicle_violations")
      .select("*")
      .eq("vehicle_id", vehicleId)
      .order("violation_date", { ascending: false });

    if (error) throw new Error(`Failed to list violations: ${error.message}`);
    return (data as VehicleViolationRow[]).map((row) => new VehicleViolation(row));
  }

  async create(input: NewVehicleViolationInput): Promise<VehicleViolation> {
    const { data, error } = await this.supabase
      .from("vehicle_violations")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Failed to create violation: ${error.message}`);
    return new VehicleViolation(data as VehicleViolationRow);
  }
}
