import type { ExamSessionRow } from "./types";

export class ExamSession {
  constructor(private readonly row: ExamSessionRow) {}

  get id() {
    return this.row.id;
  }

  get examPlaceId() {
    return this.row.exam_place_id;
  }

  get instructorId() {
    return this.row.instructor_id;
  }

  get examPlaceName() {
    return this.row.exam_places?.name ?? "-";
  }

  get instructorName() {
    return this.row.instructors?.full_name ?? "-";
  }

  startsAt(): Date {
    return new Date(this.row.starts_at);
  }

  endsAt(): Date {
    return new Date(this.row.ends_at);
  }
}
