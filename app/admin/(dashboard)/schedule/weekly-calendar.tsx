import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../exams/exam-session.model";
import { deleteLesson } from "./actions";

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
    <div className="overflow-x-auto rounded-lg border border-border">
      <div
        className="grid min-w-[900px]"
        style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}
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

        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="border-b border-r border-border p-2 text-xs text-muted">
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
                  className="flex flex-col gap-1 border-b border-l border-border p-1"
                >
                  {cellLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm"
                    >
                      <a href={lesson.whatsAppLink()} target="_blank" rel="noreferrer" className="hover:underline">
                        {lesson.studentName} &middot; {lesson.vehiclePlate}
                      </a>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/schedule/${lesson.id}/edit`} className="hover:underline">
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteLesson.bind(null, lesson.id)}
                          confirmMessage="Delete this lesson?"
                        />
                      </div>
                    </div>
                  ))}
                  {cellExamSessions.map((session) => (
                    <Link
                      key={session.id}
                      href={`/admin/exams/${session.id}`}
                      className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground hover:opacity-90"
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
