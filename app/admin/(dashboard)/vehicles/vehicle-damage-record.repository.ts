import type { SupabaseClient } from "@supabase/supabase-js";
import { VehicleDamageRecord } from "./vehicle-damage-record.model";
import type { NewVehicleDamageRecordInput, VehicleDamageRecordRow } from "./types";

export class VehicleDamageRecordRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listForVehicle(vehicleId: string): Promise<VehicleDamageRecord[]> {
    const { data, error } = await this.supabase
      .from("vehicle_damage_records")
      .select("*")
      .eq("vehicle_id", vehicleId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list damage records: ${error.message}`);
    return (data as VehicleDamageRecordRow[]).map((row) => new VehicleDamageRecord(row));
  }

  async listOpen(): Promise<VehicleDamageRecord[]> {
    const { data, error } = await this.supabase
      .from("vehicle_damage_records")
      .select("*")
      .neq("status", "resolved")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to list open damage records: ${error.message}`);
    return (data as VehicleDamageRecordRow[]).map((row) => new VehicleDamageRecord(row));
  }

  async create(input: NewVehicleDamageRecordInput): Promise<VehicleDamageRecord> {
    const { data, error } = await this.supabase
      .from("vehicle_damage_records")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(`Failed to create damage record: ${error.message}`);
    return new VehicleDamageRecord(data as VehicleDamageRecordRow);
  }

  async findById(id: string): Promise<VehicleDamageRecord> {
    const { data, error } = await this.supabase
      .from("vehicle_damage_records")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find damage record: ${error.message}`);
    return new VehicleDamageRecord(data as VehicleDamageRecordRow);
  }

  async update(id: string, input: NewVehicleDamageRecordInput): Promise<VehicleDamageRecord> {
    const { data, error } = await this.supabase
      .from("vehicle_damage_records")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update damage record: ${error.message}`);
    return new VehicleDamageRecord(data as VehicleDamageRecordRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("vehicle_damage_records").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete damage record: ${error.message}`);
  }
}
