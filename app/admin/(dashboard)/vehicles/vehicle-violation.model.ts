import type { VehicleViolationRow } from "./types";

export class VehicleViolation {
  constructor(private readonly row: VehicleViolationRow) {}

  get id() {
    return this.row.id;
  }

  get vehicleId() {
    return this.row.vehicle_id;
  }

  get violationType() {
    return this.row.violation_type;
  }

  get description() {
    return this.row.description;
  }

  get fineAmount() {
    return this.row.fine_amount;
  }

  violationDate(): Date {
    return new Date(this.row.violation_date);
  }
}
