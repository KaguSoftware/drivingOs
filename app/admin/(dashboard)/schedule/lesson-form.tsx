"use client";

import { useMemo, useState } from "react";
import { createLesson, updateLesson } from "./actions";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import { DURATION_OPTIONS, DEFAULT_DURATION_MINUTES } from "./duration";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function addMinutes(value: string, minutes: number): string {
  if (!value) return "";
  const date = new Date(value);
  date.setMinutes(date.getMinutes() + minutes);
  return toLocalDateTimeValue(date);
}

function minutesBetween(start: string, end: string): number {
  if (!start || !end) return DEFAULT_DURATION_MINUTES;
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
}

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
  const action = lesson ? updateLesson.bind(null, lesson.id) : createLesson;

  const [vehicleId, setVehicleId] = useState(lesson?.vehicleId ?? "");
  const [startsAt, setStartsAt] = useState(
    lesson ? toLocalDateTimeValue(new Date(lesson.startsAt)) : (defaultStartsAt ?? "")
  );
  const [durationMinutes, setDurationMinutes] = useState(
    lesson ? minutesBetween(lesson.startsAt, lesson.endsAt) : DEFAULT_DURATION_MINUTES
  );

  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
  const licenseClass = selectedVehicle?.licenseClass;

  const eligibleStudents = useMemo(
    () => (licenseClass ? students.filter((student) => student.licenseClass === licenseClass) : students),
    [students, licenseClass]
  );
  const eligibleInstructors = useMemo(
    () =>
      licenseClass
        ? instructors.filter((instructor) => instructor.licenseClasses.includes(licenseClass))
        : instructors,
    [instructors, licenseClass]
  );

  const endsAt = addMinutes(startsAt, durationMinutes);

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Vehicle
        <select
          name="vehicle_id"
          required
          value={vehicleId}
          onChange={(event) => setVehicleId(event.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select a vehicle
          </option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate} &middot; {vehicle.licenseClass}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Student
        {licenseClass && (
          <span className="text-xs text-muted">Showing class {licenseClass} students</span>
        )}
        <select name="student_id" required defaultValue={lesson?.studentId} className={inputClass}>
          {eligibleStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Instructor
        {licenseClass && (
          <span className="text-xs text-muted">Showing class {licenseClass} instructors</span>
        )}
        <select name="instructor_id" required defaultValue={lesson?.instructorId} className={inputClass}>
          {eligibleInstructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Starts at
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
        Duration
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
      <input type="hidden" name="ends_at" value={endsAt} />
      <Button type="submit">{lesson ? "Save changes" : "Book lesson"}</Button>
    </form>
  );
}
