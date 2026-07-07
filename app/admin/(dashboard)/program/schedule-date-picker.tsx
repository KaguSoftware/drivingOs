"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarGrid } from "@/components/ui/calendar-grid";
import { startOfWeek, toDateParam, toMonthParam } from "./date-utils";

export function ScheduleDatePicker({
  label,
  selectedDate,
  isMonthView,
}: {
  label: string;
  selectedDate: Date;
  isMonthView: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate);
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

  function selectDate(day: Date) {
    setOpen(false);
    if (isMonthView) {
      router.push(`/admin/program?view=month&month=${toMonthParam(day)}`);
    } else {
      router.push(`/admin/program?week=${toDateParam(startOfWeek(day))}`);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="rounded-md text-2xl font-semibold hover:opacity-80"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 rounded-lg border border-border bg-surface p-3 shadow-lg">
          <CalendarGrid
            viewDate={viewDate}
            onViewDateChange={setViewDate}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
          />
        </div>
      )}
    </div>
  );
}
