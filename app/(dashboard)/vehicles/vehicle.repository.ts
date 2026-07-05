import type { SupabaseClient } from "@supabase/supabase-js";
import { Vehicle } from "./vehicle.model";
import type { NewVehicleInput, VehicleRow } from "./types";

export class VehicleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async create(input: NewVehicleInput): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from("vehicles")
      .insert(input)
      .select("*")
      .single();

    if (error) throw new Error(`Failed to create vehicle: ${error.message}`);
    return new Vehicle(data as VehicleRow);
  }

  async listAll(): Promise<Vehicle[]> {
    const { data, error } = await this.supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list vehicles: ${error.message}`);
    return (data as VehicleRow[]).map((row) => new Vehicle(row));
  }

  async findById(id: string): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find vehicle: ${error.message}`);
    return new Vehicle(data as VehicleRow);
  }
}
