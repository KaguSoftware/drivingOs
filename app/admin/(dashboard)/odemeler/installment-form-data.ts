import type { Student } from "../ogrenciler/student.model";
import type { InstallmentFormStudent } from "./types";

export function toInstallmentFormStudents(students: Student[]): InstallmentFormStudent[] {
  return students.map((student) => ({ id: student.id, fullName: student.fullName }));
}
