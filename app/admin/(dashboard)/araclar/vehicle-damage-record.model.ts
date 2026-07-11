import type { DamageStatus, VehicleDamageRecordRow } from "./types";

const DAMAGE_LABELS: Record<DamageStatus, string> = {
  reported: "Bildirildi",
  waiting_parts: "Parça bekleniyor",
  in_repair: "Tamirde",
  resolved: "Çözüldü",
};

export class VehicleDamageRecord {
  constructor(private readonly row: VehicleDamageRecordRow) {}

  static statusLabelFor(status: DamageStatus): string {
    return DAMAGE_LABELS[status];
  }

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

  get cost() {
    return this.row.cost;
  }

  createdAt(): Date {
    return new Date(this.row.created_at);
  }

  isResolved(): boolean {
    return this.row.status === "resolved";
  }

  statusLabel(): string {
    return VehicleDamageRecord.statusLabelFor(this.row.status);
  }
}
