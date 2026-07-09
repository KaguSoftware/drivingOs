import type { ExamPlace } from "../sinav-yerleri/exam-place.model";
import type { Instructor } from "../egitmenler/instructor.model";
import type { Student } from "../ogrenciler/student.model";
import type { ExamSession } from "./exam-session.model";
import type {
  ExamSessionFormInstructor,
  ExamSessionFormPlace,
  ExamSessionFormSession,
  ExamSessionFormStudent,
} from "./types";

export function toExamSessionFormPlaces(examPlaces: ExamPlace[]): ExamSessionFormPlace[] {
  return examPlaces.map((place) => ({ id: place.id, name: place.name }));
}

export function toExamSessionFormInstructors(instructors: Instructor[]): ExamSessionFormInstructor[] {
  return instructors.map((instructor) => ({ id: instructor.id, fullName: instructor.fullName }));
}

export function toExamSessionFormStudents(students: Student[]): ExamSessionFormStudent[] {
  return students.map((student) => ({ id: student.id, fullName: student.fullName }));
}

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function toExamSessionFormSession(session: ExamSession): ExamSessionFormSession {
  return {
    id: session.id,
    examPlaceId: session.examPlaceId,
    instructorId: session.instructorId,
    startsAt: toLocalDateTimeValue(session.startsAt()),
  };
}
