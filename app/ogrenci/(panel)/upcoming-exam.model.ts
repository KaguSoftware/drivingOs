import { buildMapsEmbedUrl } from "@/lib/maps";
import { buildYoutubeEmbedUrl } from "@/lib/youtube";

export interface UpcomingExamRow {
  starts_at: string;
  ends_at: string;
  exam_places: {
    name: string;
    address: string;
    notes: string | null;
    youtube_url: string | null;
  } | null;
}

export class UpcomingExam {
  constructor(private readonly row: UpcomingExamRow) {}

  get placeName() {
    return this.row.exam_places?.name ?? "";
  }

  get placeAddress() {
    return this.row.exam_places?.address ?? "";
  }

  get placeNotes() {
    return this.row.exam_places?.notes ?? null;
  }

  startsAt(): Date {
    return new Date(this.row.starts_at);
  }

  endsAt(): Date {
    return new Date(this.row.ends_at);
  }

  mapsEmbedUrl(): string {
    return buildMapsEmbedUrl(this.placeAddress);
  }

  youtubeEmbedUrl(): string | null {
    const url = this.row.exam_places?.youtube_url;
    return url ? buildYoutubeEmbedUrl(url) : null;
  }
}
