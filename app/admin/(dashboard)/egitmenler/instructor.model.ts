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

  get licenseClasses() {
    return this.row.license_classes;
  }
}
