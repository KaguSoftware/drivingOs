import type { DamageStatus, VehicleDamageRecordRow } from "./types";

const DAMAGE_LABELS: Record<DamageStatus, string> = {
  reported: "Reported",
  waiting_parts: "Waiting on parts",
  in_repair: "In repair",
  resolved: "Resolved",
};

export class VehicleDamageRecord {
  constructor(private readonly row: VehicleDamageRecordRow) {}

  get id() {
    return this.row.id;
  }

  get vehicleId() {
    return this.row.vehicle_id;
  }

  get partName() {
    return this.row.part_name;
  }

  get status() {
    return this.row.status;
  }

  get notes() {
    return this.row.notes;
  }

  isResolved(): boolean {
    return this.row.status === "resolved";
  }

  statusLabel(): string {
    return DAMAGE_LABELS[this.row.status];
  }
}
