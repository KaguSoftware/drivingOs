import Link from "next/link";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../sinavlar/exam-session.model";
import { toDateParam } from "./date-utils";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildGridDays(monthStart: Date): Date[] {
  const firstCellOffset = (monthStart.getDay() === 0 ? -6 : 1) - monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() + firstCellOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(date.getDate() + index);
    return date;
  });
}

export function MonthlyCalendar({
  monthStart,
  lessons,
  examSessions,
}: {
  monthStart: Date;
  lessons: Lesson[];
  examSessions: ExamSession[];
}) {
  const gridDays = buildGridDays(monthStart);
  const today = new Date();

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <div className="grid min-w-[700px] grid-cols-7">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="border-b border-border bg-background p-2 text-center text-sm font-medium"
          >
            {label}
          </div>
        ))}
        {gridDays.map((date) => {
          const inMonth = date.getMonth() === monthStart.getMonth();
          const dayLessons = lessons.filter((lesson) => isSameDay(lesson.startsAt(), date));
          const dayExamSessions = examSessions.filter((session) => isSameDay(session.startsAt(), date));

          return (
            <Link
              key={date.toISOString()}
              href={`/admin/program?view=week&week=${toDateParam(date)}`}
              className={`flex min-h-24 flex-col gap-1 border-b border-l border-border p-2 text-xs hover:bg-background/60 ${
                inMonth ? "" : "text-muted opacity-50"
              }`}
            >
              <span className={isSameDay(date, today) ? "font-semibold text-primary" : ""}>
                {date.getDate()}
              </span>
              {dayLessons.length > 0 && (
                <span className="rounded-md bg-primary px-1.5 py-0.5 text-primary-foreground">
                  {dayLessons.length} ders
                </span>
              )}
              {dayExamSessions.length > 0 && (
                <span className="rounded-md bg-primary px-1.5 py-0.5 text-primary-foreground">
                  {dayExamSessions.length} sınav
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
