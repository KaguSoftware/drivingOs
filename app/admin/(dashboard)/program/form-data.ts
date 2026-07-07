import type { Student } from "../ogrenciler/student.model";
import type { Instructor } from "../egitmenler/instructor.model";
import type { Vehicle } from "../araclar/vehicle.model";
import type { Lesson } from "./lesson.model";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

export function toFormStudents(students: Student[]): LessonFormStudent[] {
  return students.map((student) => ({
    id: student.id,
    fullName: student.fullName,
    licenseClasses: student.licenseClasses,
  }));
}

export function toFormInstructors(instructors: Instructor[]): LessonFormInstructor[] {
  return instructors.map((instructor) => ({
    id: instructor.id,
    fullName: instructor.fullName,
    licenseClasses: instructor.licenseClasses,
  }));
}

export function toFormVehicles(vehicles: Vehicle[]): LessonFormVehicle[] {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
    plate: vehicle.plate,
    makeModel: vehicle.makeModel,
    licenseClass: vehicle.licenseClass,
  }));
}

export function toFormLesson(lesson: Lesson) {
  return {
    id: lesson.id,
    studentId: lesson.studentId,
    instructorId: lesson.instructorId,
    vehicleId: lesson.vehicleId,
    startsAt: lesson.startsAt().toISOString(),
    endsAt: lesson.endsAt().toISOString(),
  };
}
