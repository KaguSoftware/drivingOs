import type { ExamResultRow } from "./types";

export class ExamResult {
  constructor(private readonly row: ExamResultRow) {}

  get id() {
    return this.row.id;
  }

  get instructorId() {
    return this.row.instructor_id;
  }

  get passed() {
    return this.row.passed;
  }
}
