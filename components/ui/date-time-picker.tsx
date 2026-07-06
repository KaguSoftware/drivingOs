"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarGrid } from "./calendar-grid";

function toDatePart(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
}

function splitValue(value: string): { datePart: string; timePart: string } {
  const [datePart = "", timePart = "09:00"] = value.split("T");
  return { datePart, timePart };
}

function parseDateValue(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toTimePart(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DateTimePicker({
  name,
  defaultValue,
  required,
  className,
  onValueChange,
  minDate,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
  minDate?: Date;
}) {
  const initial = splitValue(defaultValue ?? "");
  const [datePart, setDatePart] = useState(initial.datePart);
  const [timePart, setTimePart] = useState(initial.timePart);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseDateValue(initial.datePart) ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = parseDateValue(datePart);
  const value = datePart ? `${datePart}T${timePart}` : "";

  useEffect(() => {
    onValueChange?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={
          className ?? "w-full rounded-md border border-border bg-surface px-3 py-2 text-left text-sm"
        }
      >
        {selectedDate
          ? `${selectedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · ${timePart}`
          : "Select date & time"}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 flex flex-col gap-3 rounded-lg border border-border bg-surface p-3 shadow-lg">
          <CalendarGrid
            viewDate={viewDate}
            onViewDateChange={setViewDate}
            selectedDate={selectedDate}
            onSelectDate={(day) => setDatePart(toDatePart(day))}
            minDate={minDate}
          />
          <label className="flex items-center justify-between gap-2 text-sm">
            Time
            <input
              type="time"
              value={timePart}
              min={minDate && selectedDate && isSameDay(selectedDate, minDate) ? toTimePart(minDate) : undefined}
              onChange={(event) => setTimePart(event.target.value)}
              className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
            />
          </label>
        </div>
      )}
    </div>
  );
}
