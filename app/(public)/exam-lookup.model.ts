import { buildMapsEmbedUrl } from "@/lib/maps";
import { buildYoutubeEmbedUrl } from "@/lib/youtube";
import type { LookupRpcRow } from "./types";

export class UpcomingExam {
  constructor(private readonly row: LookupRpcRow) {}

  get studentFullName() {
    return this.row.student_full_name;
  }

  get placeName() {
    return this.row.exam_place_name;
  }

  get placeAddress() {
    return this.row.exam_place_address;
  }

  get placeNotes() {
    return this.row.exam_place_notes;
  }

  startsAt(): Date {
    return new Date(this.row.starts_at);
  }

  endsAt(): Date {
    return new Date(this.row.ends_at);
  }

  mapsEmbedUrl(): string {
    return buildMapsEmbedUrl(this.row.exam_place_address);
  }

  youtubeEmbedUrl(): string | null {
    return this.row.youtube_url ? buildYoutubeEmbedUrl(this.row.youtube_url) : null;
  }
}
