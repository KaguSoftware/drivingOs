import { createExamSession, updateExamSession } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import type { ExamPlace } from "../exam-places/exam-place.model";
import type { Instructor } from "../tutors/instructor.model";
import type { ExamSession } from "./exam-session.model";

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
        Sınav yeri
        <select name="exam_place_id" required defaultValue={session?.examPlaceId} className={inputClass}>
          {examPlaces.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Gözetmen (eğitmen)
        <select name="instructor_id" required defaultValue={session?.instructorId ?? undefined} className={inputClass}>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Başlangıç
        <DateTimePicker
          name="starts_at"
          required
          defaultValue={session ? toLocalDateTimeValue(session.startsAt()) : undefined}
          className={inputClass}
          minDate={new Date()}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Bitiş
        <DateTimePicker
          name="ends_at"
          required
          defaultValue={session ? toLocalDateTimeValue(session.endsAt()) : undefined}
          className={inputClass}
        />
      </label>
      <Button type="submit">{session ? "Değişiklikleri kaydet" : "Sınav planla"}</Button>
    </form>
  );
}
