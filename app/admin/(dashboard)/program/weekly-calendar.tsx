import Link from "next/link";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../sinavlar/exam-session.model";
import { LessonCard, ExamSessionCard } from "./calendar-cards";
import { PRESET_SLOTS, presetSlotToDateRange } from "@/lib/lesson-slots";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function WeeklyCalendar({
  weekStart,
  lessons,
  examSessions,
}: {
  weekStart: Date;
  lessons: Lesson[];
  examSessions: ExamSession[];
}) {
  const days = DAY_LABELS.map((label, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return { label, date };
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <div
        className="grid min-w-[900px]"
        style={{ gridTemplateColumns: `100px repeat(7, 1fr)` }}
      >
        <div className="border-b border-r border-border bg-background p-2" />
        {days.map((day) => (
          <div
            key={day.label}
            className="border-b border-border bg-background p-2 text-center text-sm font-medium"
          >
            {day.label} {day.date.getDate()}
          </div>
        ))}

        {PRESET_SLOTS.map((slot) => (
          <div key={slot.label} className="contents">
            <div className="border-b border-r border-border p-2 text-xs text-muted">
              {slot.start}
              <br />
              {slot.end}
            </div>
            {days.map((day) => {
              const { startsAt: slotStart, endsAt: slotEnd } = presetSlotToDateRange(day.date, slot);

              const cellLessons = lessons.filter(
                (lesson) =>
                  isSameDay(lesson.startsAt(), day.date) &&
                  overlaps(lesson.startsAt(), lesson.endsAt(), slotStart, slotEnd)
              );
              const cellExamSessions = examSessions.filter(
                (session) =>
                  isSameDay(session.startsAt(), day.date) &&
                  overlaps(session.startsAt(), session.endsAt(), slotStart, slotEnd)
              );
              const isEmpty = cellLessons.length === 0 && cellExamSessions.length === 0;
              const isPast = slotStart.getTime() < Date.now();

              return (
                <div
                  key={day.label}
                  className={`group relative flex flex-col gap-1 border-b border-l border-border p-1 ${
                    isPast && isEmpty ? "bg-background/40" : ""
                  }`}
                >
                  {isEmpty && !isPast && (
                    <Link
                      href={`/admin/program/yeni?starts_at=${encodeURIComponent(toLocalDateTimeValue(slotStart))}`}
                      className="absolute inset-0 flex items-center justify-center text-xs text-muted opacity-0 transition-opacity hover:bg-background/60 group-hover:opacity-100"
                      aria-label={`${slot.label} için ders planla`}
                    >
                      +
                    </Link>
                  )}
                  {cellLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                  {cellExamSessions.map((session) => (
                    <ExamSessionCard key={session.id} session={session} />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
