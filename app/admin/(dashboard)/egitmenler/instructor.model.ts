import type { InstructorFormValues, InstructorRow } from "./types";

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

  get monthlyWage() {
    return this.row.monthly_wage;
  }

  assignedVehiclePlate(): string | null {
    return this.row.vehicles?.plate ?? null;
  }

  toFormValues(): InstructorFormValues {
    return {
      id: this.row.id,
      fullName: this.row.full_name,
      phone: this.row.phone,
      email: this.row.email,
      licenseClasses: this.row.license_classes,
      assignedVehicleId: this.row.assigned_vehicle_id,
      monthlyWage: this.row.monthly_wage,
    };
  }
}
