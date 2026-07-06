"use client";

const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function CalendarGrid({
  viewDate,
  onViewDateChange,
  selectedDate,
  onSelectDate,
}: {
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) {
  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startWeekday = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)),
  ];

  return (
    <div className="w-64">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="rounded p-1 text-sm hover:bg-background"
        >
          &lsaquo;
        </button>
        <span className="text-sm font-medium">
          {viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          onClick={() => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="rounded p-1 text-sm hover:bg-background"
        >
          &rsaquo;
        </button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) =>
          day ? (
            <button
              key={index}
              type="button"
              onClick={() => onSelectDate(day)}
              className={
                selectedDate && isSameDay(day, selectedDate)
                  ? "rounded-md bg-primary py-1 text-sm text-primary-foreground"
                  : "rounded-md py-1 text-sm hover:bg-background"
              }
            >
              {day.getDate()}
            </button>
          ) : (
            <span key={index} />
          ),
        )}
      </div>
    </div>
  );
}
