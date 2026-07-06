import type { Transmission, VehicleRow } from "./types";

const TRANSMISSION_LABELS: Record<string, string> = {
  manual: "Manuel",
  automatic: "Otomatik",
};

export class Vehicle {
  constructor(private readonly row: VehicleRow) {}

  static transmissionLabelFor(transmission: Transmission): string {
    return TRANSMISSION_LABELS[transmission] ?? transmission;
  }

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

  transmissionLabel() {
    return Vehicle.transmissionLabelFor(this.row.transmission);
  }

  get licenseClass() {
    return this.row.license_class;
  }
}
