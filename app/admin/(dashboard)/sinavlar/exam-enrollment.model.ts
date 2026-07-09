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

  get examSessionId() {
    return this.row.exam_session_id;
  }

  get examPlaceName() {
    return this.row.exam_sessions?.exam_places?.name ?? "-";
  }

  examStartsAt(): Date | null {
    return this.row.exam_sessions ? new Date(this.row.exam_sessions.starts_at) : null;
  }
}
