"use client";

import { useEffect, useRef, useState } from "react";

const WEEKDAY_LABELS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const MONTH_LABELS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const YEAR_RANGE = 10;

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function CalendarGrid({
  viewDate,
  onViewDateChange,
  selectedDate,
  onSelectDate,
  minDate,
}: {
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
}) {
  const [openPicker, setOpenPicker] = useState<"month" | "year" | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setOpenPicker(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startWeekday = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)),
  ];
  const yearOptions = Array.from(
    { length: YEAR_RANGE * 2 + 1 },
    (_, i) => viewDate.getFullYear() - YEAR_RANGE + i,
  );

  return (
    <div className="w-64" ref={pickerRef}>
      <div className="relative mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="rounded p-1 text-sm hover:bg-background"
        >
          &lsaquo;
        </button>
        <div className="flex items-center gap-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setOpenPicker((current) => (current === "month" ? null : "month"))}
            className="rounded px-1 hover:bg-background"
          >
            {MONTH_LABELS[viewDate.getMonth()]}
          </button>
          <button
            type="button"
            onClick={() => setOpenPicker((current) => (current === "year" ? null : "year"))}
            className="rounded px-1 hover:bg-background"
          >
            {viewDate.getFullYear()}
          </button>
        </div>
        <button
          type="button"
          onClick={() => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="rounded p-1 text-sm hover:bg-background"
        >
          &rsaquo;
        </button>

        {openPicker === "month" && (
          <div className="absolute top-full left-0 z-10 mt-1 grid max-h-48 w-full grid-cols-3 gap-1 overflow-y-auto rounded-md border border-border bg-surface p-2 shadow-lg">
            {MONTH_LABELS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  onViewDateChange(new Date(viewDate.getFullYear(), index, 1));
                  setOpenPicker(null);
                }}
                className={
                  index === viewDate.getMonth()
                    ? "rounded-md bg-primary py-1 text-xs text-primary-foreground"
                    : "rounded-md py-1 text-xs hover:bg-background"
                }
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {openPicker === "year" && (
          <div className="absolute top-full left-0 z-10 mt-1 grid max-h-48 w-full grid-cols-3 gap-1 overflow-y-auto rounded-md border border-border bg-surface p-2 shadow-lg">
            {yearOptions.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  onViewDateChange(new Date(year, viewDate.getMonth(), 1));
                  setOpenPicker(null);
                }}
                className={
                  year === viewDate.getFullYear()
                    ? "rounded-md bg-primary py-1 text-xs text-primary-foreground"
                    : "rounded-md py-1 text-xs hover:bg-background"
                }
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={index} />;

          const isDisabled = Boolean(minDate) && day < (minDate as Date);
          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(day)}
              className={
                isDisabled
                  ? "rounded-md py-1 text-sm text-muted opacity-40"
                  : selectedDate && isSameDay(day, selectedDate)
                    ? "rounded-md bg-primary py-1 text-sm text-primary-foreground"
                    : "rounded-md py-1 text-sm hover:bg-background"
              }
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
