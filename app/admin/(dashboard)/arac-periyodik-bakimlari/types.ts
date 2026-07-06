// Mirrors supabase/migrations/0004_vehicle_periodic_checks.sql — keep in sync.

export const CHECK_TYPES = ["kasko", "muayene", "sigorta", "periyodik_bakim"] as const;
export type CheckType = (typeof CHECK_TYPES)[number];

export interface VehiclePeriodicCheckRow {
  id: string;
  vehicle_id: string;
  check_type: CheckType;
  due_date: string;
  cost: number | null;
  provider: string | null;
  created_at: string;
  vehicles: { plate: string; make_model: string } | null;
}

export interface NewVehiclePeriodicCheckInput {
  vehicle_id: string;
  check_type: CheckType;
  due_date: string;
  cost: number | null;
  provider: string | null;
}

export type CheckStatus = "ok" | "due_soon" | "overdue";
