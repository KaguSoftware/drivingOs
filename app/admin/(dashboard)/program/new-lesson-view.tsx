"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { LessonForm } from "./lesson-form";
import { PresetSlotPicker } from "./preset-slot-picker";
import type { LessonFormInstructor, LessonFormStudent, LessonFormVehicle } from "./types";

// Defaults to the fixed 2-hour preset slots; "Özel Ders Planla" switches to
// the free-form date/time + duration flow (LessonForm) for edge cases the
// presets don't cover.
export function NewLessonView({
  students,
  instructors,
  vehicles,
  defaultStartsAt,
}: {
  students: LessonFormStudent[];
  instructors: LessonFormInstructor[];
  vehicles: LessonFormVehicle[];
  defaultStartsAt?: string;
}) {
  const [mode, setMode] = useState<"preset" | "custom">("preset");

  return (
    <div className="flex flex-col gap-4">
      {mode === "preset" ? (
        <PresetSlotPicker
          students={students}
          instructors={instructors}
          vehicles={vehicles}
          defaultStartsAt={defaultStartsAt}
        />
      ) : (
        <LessonForm
          students={students}
          instructors={instructors}
          vehicles={vehicles}
          defaultStartsAt={defaultStartsAt}
        />
      )}
      <div className="flex justify-end">
        {mode === "preset" ? (
          <button
            type="button"
            onClick={() => setMode("custom")}
            className={buttonClasses("primary")}
          >
            Özel Ders Planla
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("preset")}
            className={buttonClasses("primary")}
          >
            Hazır saatlerden seç
          </button>
        )}
      </div>
    </div>
  );
}
