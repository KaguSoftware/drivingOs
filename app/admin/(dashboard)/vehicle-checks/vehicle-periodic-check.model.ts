import type { CheckStatus, CheckType, VehiclePeriodicCheckRow } from "./types";

const CHECK_TYPE_LABELS: Record<CheckType, string> = {
  kasko: "Kasko",
  muayene: "Muayene",
  sigorta: "Sigorta",
  periyodik_bakim: "Periyodik bakım",
};

const STATUS_LABELS: Record<CheckStatus, string> = {
  ok: "Sorun yok",
  due_soon: "Yaklaşıyor",
  overdue: "Gecikmiş",
};

const DUE_SOON_WINDOW_DAYS = 30;

export class VehiclePeriodicCheck {
  constructor(private readonly row: VehiclePeriodicCheckRow) {}

  get id() {
    return this.row.id;
  }

  get vehicleId() {
    return this.row.vehicle_id;
  }

  get checkType() {
    return this.row.check_type;
  }

  get cost() {
    return this.row.cost;
  }

  get provider() {
    return this.row.provider;
  }

  get vehiclePlate() {
    return this.row.vehicles?.plate ?? "-";
  }

  get vehicleMakeModel() {
    return this.row.vehicles?.make_model ?? "-";
  }

  dueDate(): Date {
    return new Date(this.row.due_date);
  }

  checkTypeLabel(): string {
    return CHECK_TYPE_LABELS[this.row.check_type];
  }

  status(): CheckStatus {
    const now = new Date();
    const due = this.dueDate();
    const dueSoonThreshold = new Date(now.getTime() + DUE_SOON_WINDOW_DAYS * 24 * 60 * 60 * 1000);

    if (due < now) return "overdue";
    if (due < dueSoonThreshold) return "due_soon";
    return "ok";
  }

  statusLabel(): string {
    return STATUS_LABELS[this.status()];
  }
}
