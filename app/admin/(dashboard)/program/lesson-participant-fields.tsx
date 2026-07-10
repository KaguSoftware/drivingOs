import { inputClass } from "@/components/ui/input-classes";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

// Shared vehicle/student/instructor selects used by both LessonForm (custom
// time flow) and PresetSlotPicker (fixed slot flow), so the license-class
// filtering logic and option lists only live in one place.
export function LessonParticipantFields({
  students,
  instructors,
  vehicles,
  vehicleId,
  onVehicleChange,
  defaultStudentId,
  defaultInstructorId,
}: {
  students: LessonFormStudent[];
  instructors: LessonFormInstructor[];
  vehicles: LessonFormVehicle[];
  vehicleId: string;
  onVehicleChange: (vehicleId: string) => void;
  defaultStudentId?: string;
  defaultInstructorId?: string;
}) {
  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
  const licenseClass = selectedVehicle?.licenseClass;

  const eligibleStudents = licenseClass
    ? students.filter((student) => student.licenseClasses.includes(licenseClass))
    : students;
  const eligibleInstructors = licenseClass
    ? instructors.filter((instructor) => instructor.licenseClasses.includes(licenseClass))
    : instructors;

  return (
    <>
      <label className="flex flex-col gap-1 text-sm">
        Araç
        <select
          name="vehicle_id"
          required
          value={vehicleId}
          onChange={(event) => onVehicleChange(event.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Bir araç seçin
          </option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.makeModel} &middot; {vehicle.plate} &middot; {vehicle.licenseClass}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Öğrenci
        {licenseClass && (
          <span className="text-xs text-muted">{licenseClass} sınıfı öğrenciler gösteriliyor</span>
        )}
        <select name="student_id" required defaultValue={defaultStudentId} className={inputClass}>
          {eligibleStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Eğitmen
        {licenseClass && (
          <span className="text-xs text-muted">{licenseClass} sınıfı eğitmenler gösteriliyor</span>
        )}
        <select name="instructor_id" required defaultValue={defaultInstructorId} className={inputClass}>
          {eligibleInstructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
