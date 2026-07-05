import { createLesson } from "./actions";
import type { Student } from "../students/student.model";
import type { Instructor } from "../tutors/instructor.model";
import type { Vehicle } from "../vehicles/vehicle.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function LessonForm({
  students,
  instructors,
  vehicles,
}: {
  students: Student[];
  instructors: Instructor[];
  vehicles: Vehicle[];
}) {
  return (
    <form action={createLesson} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Student
        <select name="student_id" required className={inputClass}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Instructor
        <select name="instructor_id" required className={inputClass}>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Vehicle
        <select name="vehicle_id" required className={inputClass}>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Starts at
        <input name="starts_at" type="datetime-local" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Ends at
        <input name="ends_at" type="datetime-local" required className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Book lesson
      </button>
    </form>
  );
}
