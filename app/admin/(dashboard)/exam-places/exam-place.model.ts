import { buildMapsEmbedUrl } from "@/lib/maps";
import type { ExamPlaceRow } from "./types";

export class ExamPlace {
  constructor(private readonly row: ExamPlaceRow) {}

  get id() {
    return this.row.id;
  }

  get name() {
    return this.row.name;
  }

  get address() {
    return this.row.address;
  }

  get notes() {
    return this.row.notes;
  }

  mapsEmbedUrl(): string {
    return buildMapsEmbedUrl(this.row.address);
  }
}
