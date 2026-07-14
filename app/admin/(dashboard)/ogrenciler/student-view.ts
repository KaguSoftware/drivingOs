import type { Student } from "./student.model";

/** Plain, serialisable row for the client-side DataTable (class methods don't cross the RSC boundary). */
export type StudentRowView = {
  id: string;
  fullName: string;
  phone: string;
  licenseLabel: string;
  licenseClasses: string[];
  theoryLabel: string;
  practiceLabel: string;
  mebLabel: string;
  isDebtor: boolean;
};

export function toStudentView(student: Student, debt: number): StudentRowView {
  return {
    id: student.id,
    fullName: student.fullName,
    phone: student.phone,
    licenseLabel: student.licenseLabel(),
    licenseClasses: student.licenseClasses as string[],
    theoryLabel: student.theoryLabel(),
    practiceLabel: student.practiceLabel(),
    mebLabel: student.mebLabel(),
    isDebtor: debt > 0,
  };
}
