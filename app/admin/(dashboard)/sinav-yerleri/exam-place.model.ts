import { buildMapsEmbedUrl } from "@/lib/maps";
import { buildYoutubeEmbedUrl } from "@/lib/youtube";
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

  get youtubeUrl() {
    return this.row.youtube_url;
  }

  mapsEmbedUrl(): string {
    return buildMapsEmbedUrl(this.row.address);
  }

  youtubeEmbedUrl(): string | null {
    return this.row.youtube_url ? buildYoutubeEmbedUrl(this.row.youtube_url) : null;
  }
}
