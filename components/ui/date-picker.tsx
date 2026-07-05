"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarGrid } from "./calendar-grid";

function toDateValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
}

function parseDateValue(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function DatePicker({
  name,
  defaultValue,
  required,
  className,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseDateValue(defaultValue ?? "") ?? new Date());
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

  const selectedDate = parseDateValue(value);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={
          className ?? "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700"
        }
      >
        {selectedDate
          ? selectedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
          : "Select date"}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 rounded-lg border border-zinc-200 bg-[var(--background)] p-3 shadow-lg dark:border-zinc-800">
          <CalendarGrid
            viewDate={viewDate}
            onViewDateChange={setViewDate}
            selectedDate={selectedDate}
            onSelectDate={(day) => {
              setValue(toDateValue(day));
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
