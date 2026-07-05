import { createLesson, updateLesson } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import type { Student } from "../students/student.model";
import type { Instructor } from "../tutors/instructor.model";
import type { Vehicle } from "../vehicles/vehicle.model";
import type { Lesson } from "./lesson.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700";

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function LessonForm({
  students,
  instructors,
  vehicles,
  lesson,
}: {
  students: Student[];
  instructors: Instructor[];
  vehicles: Vehicle[];
  lesson?: Lesson;
}) {
  const action = lesson ? updateLesson.bind(null, lesson.id) : createLesson;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Student
        <select name="student_id" required defaultValue={lesson?.studentId} className={inputClass}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Instructor
        <select name="instructor_id" required defaultValue={lesson?.instructorId} className={inputClass}>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Vehicle
        <select name="vehicle_id" required defaultValue={lesson?.vehicleId} className={inputClass}>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Starts at
        <DateTimePicker
          name="starts_at"
          required
          defaultValue={lesson ? toLocalDateTimeValue(lesson.startsAt()) : undefined}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Ends at
        <DateTimePicker
          name="ends_at"
          required
          defaultValue={lesson ? toLocalDateTimeValue(lesson.endsAt()) : undefined}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        {lesson ? "Save changes" : "Book lesson"}
      </button>
    </form>
  );
}
