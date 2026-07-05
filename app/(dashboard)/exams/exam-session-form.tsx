import { createExamSession, updateExamSession } from "./actions";
import type { ExamPlace } from "../exam-places/exam-place.model";
import type { Instructor } from "../tutors/instructor.model";
import type { ExamSession } from "./exam-session.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function ExamSessionForm({
  examPlaces,
  instructors,
  session,
}: {
  examPlaces: ExamPlace[];
  instructors: Instructor[];
  session?: ExamSession;
}) {
  const action = session ? updateExamSession.bind(null, session.id) : createExamSession;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Exam place
        <select name="exam_place_id" required defaultValue={session?.examPlaceId} className={inputClass}>
          {examPlaces.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Proctor (instructor)
        <select name="instructor_id" required defaultValue={session?.instructorId ?? undefined} className={inputClass}>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Starts at
        <input
          name="starts_at"
          type="datetime-local"
          required
          defaultValue={session ? toLocalDateTimeValue(session.startsAt()) : undefined}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Ends at
        <input
          name="ends_at"
          type="datetime-local"
          required
          defaultValue={session ? toLocalDateTimeValue(session.endsAt()) : undefined}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {session ? "Save changes" : "Schedule exam"}
      </button>
    </form>
  );
}
