"use client";

import { useActionState } from "react";
import { createExamSession, updateExamSession } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import type {
  ExamSessionFormInstructor,
  ExamSessionFormPlace,
  ExamSessionFormSession,
  ExamSessionFormStudent,
} from "./types";

export function ExamSessionForm({
  examPlaces,
  instructors,
  students,
  session,
}: {
  examPlaces: ExamSessionFormPlace[];
  instructors: ExamSessionFormInstructor[];
  students?: ExamSessionFormStudent[];
  session?: ExamSessionFormSession;
}) {
  const [result, formAction] = useActionState(
    session ? updateExamSession.bind(null, session.id) : createExamSession,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Başlangıç
          <DateTimePicker
            name="starts_at"
            required
            defaultValue={session?.startsAt}
            className={inputClass}
            minDate={new Date()}
          />
        </label>
      </div>
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
      <FormFeedback result={result} />
      <SubmitButton>{session ? "Değişiklikleri kaydet" : "Sınav planla"}</SubmitButton>
    </form>
  );
}
