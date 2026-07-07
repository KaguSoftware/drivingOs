import type { InstructorRow } from "./types";

export class Instructor {
  constructor(private readonly row: InstructorRow) {}

  get id() {
    return this.row.id;
  }

  get fullName() {
    return this.row.full_name;
  }

  get phone() {
    return this.row.phone;
  }

  get email() {
    return this.row.email;
  }

  get licenseClasses() {
    return this.row.license_classes;
  }

  get assignedVehicleId() {
    return this.row.assigned_vehicle_id;
  }

  assignedVehiclePlate(): string | null {
    return this.row.vehicles?.plate ?? null;
  }
}
