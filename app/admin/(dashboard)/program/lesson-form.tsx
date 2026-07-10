"use client";

import { useActionState, useState } from "react";
import { createLesson, updateLesson } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { DURATION_OPTIONS, DEFAULT_DURATION_MINUTES } from "./duration";
import { addMinutes, minutesBetween, toLocalDateTimeValue } from "./lesson-time";
import { LessonParticipantFields } from "./lesson-participant-fields";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

export function LessonForm({
  students,
  instructors,
  vehicles,
  lesson,
  defaultStartsAt,
}: {
  students: LessonFormStudent[];
  instructors: LessonFormInstructor[];
  vehicles: LessonFormVehicle[];
  lesson?: {
    id: string;
    studentId: string;
    instructorId: string;
    vehicleId: string;
    startsAt: string;
    endsAt: string;
  };
  defaultStartsAt?: string;
}) {
  const [result, formAction] = useActionState(
    lesson ? updateLesson.bind(null, lesson.id) : createLesson,
    null
  );

  const [vehicleId, setVehicleId] = useState(lesson?.vehicleId ?? "");
  const [startsAt, setStartsAt] = useState(
    lesson ? toLocalDateTimeValue(new Date(lesson.startsAt)) : (defaultStartsAt ?? "")
  );
  const [durationMinutes, setDurationMinutes] = useState(
    lesson ? minutesBetween(lesson.startsAt, lesson.endsAt) : DEFAULT_DURATION_MINUTES
  );

  const endsAt = addMinutes(startsAt, durationMinutes);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <LessonParticipantFields
          students={students}
          instructors={instructors}
          vehicles={vehicles}
          vehicleId={vehicleId}
          onVehicleChange={setVehicleId}
          defaultStudentId={lesson?.studentId}
          defaultInstructorId={lesson?.instructorId}
        />
        <label className="flex flex-col gap-1 text-sm">
          Başlangıç
          <DateTimePicker
            name="starts_at"
            required
            defaultValue={startsAt}
            onValueChange={setStartsAt}
            className={inputClass}
            minDate={new Date()}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Süre
          <select
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(Number(event.target.value))}
            className={inputClass}
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option.minutes} value={option.minutes}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <input type="hidden" name="ends_at" value={endsAt} />
      <FormFeedback result={result} />
      <SubmitButton>{lesson ? "Değişiklikleri kaydet" : "Ders planla"}</SubmitButton>
    </form>
  );
}
