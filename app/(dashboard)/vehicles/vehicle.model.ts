import type { VehicleRow } from "./types";

export class Vehicle {
  constructor(private readonly row: VehicleRow) {}

  get id() {
    return this.row.id;
  }

  get plate() {
    return this.row.plate;
  }

  get makeModel() {
    return this.row.make_model;
  }

  get transmission() {
    return this.row.transmission;
  }

  get licenseClass() {
    return this.row.license_class;
  }
}
