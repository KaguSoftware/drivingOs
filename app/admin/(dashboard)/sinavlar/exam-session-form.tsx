import { createExamSession, updateExamSession } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ExamPlace } from "../sinav-yerleri/exam-place.model";
import type { Instructor } from "../egitmenler/instructor.model";
import type { Student } from "../ogrenciler/student.model";
import type { ExamSession } from "./exam-session.model";

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function ExamSessionForm({
  examPlaces,
  instructors,
  students,
  session,
}: {
  examPlaces: ExamPlace[];
  instructors: Instructor[];
  students?: Student[];
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
      {students && students.length > 0 && (
        <fieldset className="flex flex-col gap-1 text-sm">
          <legend className="mb-1">Öğrenciler</legend>
          <div className="flex max-h-48 flex-col gap-1 overflow-y-auto rounded border border-border p-2">
            {students.map((student) => (
              <label key={student.id} className="flex items-center gap-2">
                <input type="checkbox" name="student_ids" value={student.id} />
                {student.fullName}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <SubmitButton>{session ? "Değişiklikleri kaydet" : "Sınav planla"}</SubmitButton>
    </form>
  );
}
