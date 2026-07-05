// Mirrors supabase/migrations/0001_init.sql (vehicles) and
// supabase/migrations/0003_vehicle_damage_and_violations.sql — keep in sync.

import { LICENSE_CLASSES, type LicenseClass } from "../students/types";

export { LICENSE_CLASSES };
export type { LicenseClass };

export const TRANSMISSIONS = ["manual", "automatic"] as const;
export type Transmission = (typeof TRANSMISSIONS)[number];

export interface VehicleRow {
  id: string;
  plate: string;
  make_model: string;
  transmission: Transmission;
  license_class: LicenseClass;
  created_at: string;
}

export interface NewVehicleInput {
  plate: string;
  make_model: string;
  transmission: Transmission;
  license_class: LicenseClass;
}

export const DAMAGE_STATUSES = [
  "reported",
  "waiting_parts",
  "in_repair",
  "resolved",
] as const;
export type DamageStatus = (typeof DAMAGE_STATUSES)[number];

export interface VehicleDamageRecordRow {
  id: string;
  vehicle_id: string;
  part_name: string;
  status: DamageStatus;
  notes: string | null;
  created_at: string;
}

export interface NewVehicleDamageRecordInput {
  vehicle_id: string;
  part_name: string;
  status: DamageStatus;
  notes: string | null;
}

export interface VehicleViolationRow {
  id: string;
  vehicle_id: string;
  violation_type: string;
  description: string | null;
  violation_date: string;
  fine_amount: number | null;
  created_at: string;
}

export interface NewVehicleViolationInput {
  vehicle_id: string;
  violation_type: string;
  description: string | null;
  violation_date: string;
  fine_amount: number | null;
}
