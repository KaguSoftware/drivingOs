import type { ExamEnrollmentRow } from "./types";

export class ExamEnrollment {
  constructor(private readonly row: ExamEnrollmentRow) {}

  get id() {
    return this.row.id;
  }

  get studentId() {
    return this.row.student_id;
  }

  get studentName() {
    return this.row.students?.full_name ?? "-";
  }
}
