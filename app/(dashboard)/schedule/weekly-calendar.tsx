import Link from "next/link";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../exams/exam-session.model";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 08:00-20:00

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div
        className="grid min-w-[900px]"
        style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}
      >
        <div className="border-b border-r border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900" />
        {days.map((day) => (
          <div
            key={day.label}
            className="border-b border-zinc-200 bg-zinc-50 p-2 text-center text-sm font-medium dark:border-zinc-800 dark:bg-zinc-900"
          >
            {day.label} {day.date.getDate()}
          </div>
        ))}

        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="border-b border-r border-zinc-200 p-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {String(hour).padStart(2, "0")}:00
            </div>
            {days.map((day) => {
              const cellLessons = lessons.filter(
                (lesson) => isSameDay(lesson.startsAt(), day.date) && lesson.startsAt().getHours() === hour
              );
              const cellExamSessions = examSessions.filter(
                (session) => isSameDay(session.startsAt(), day.date) && session.startsAt().getHours() === hour
              );
              return (
                <div
                  key={day.label}
                  className="flex flex-col gap-1 border-b border-l border-zinc-200 p-1 dark:border-zinc-800"
                >
                  {cellLessons.map((lesson) => (
                    <a
                      key={lesson.id}
                      href={lesson.whatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-zinc-900 px-2 py-1 text-xs text-white hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      {lesson.studentName} &middot; {lesson.vehiclePlate}
                    </a>
                  ))}
                  {cellExamSessions.map((session) => (
                    <Link
                      key={session.id}
                      href={`/exams/${session.id}`}
                      className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:opacity-90"
                    >
                      Exam &middot; {session.examPlaceName}
                    </Link>
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
