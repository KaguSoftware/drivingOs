import type { Lesson } from "../../../admin/(dashboard)/program/lesson.model";

function formatDay(date: Date): string {
  return date.toLocaleDateString("tr-TR", { weekday: "long", day: "2-digit", month: "long" });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

// Compact, mobile-friendly list of lessons for the teacher panel.
export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {lessons.map((lesson) => (
        <li
          key={lesson.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
        >
          <div className="min-w-0">
            <p className="truncate font-medium">{lesson.studentName}</p>
            <p className="text-xs text-muted">
              {formatDay(lesson.startsAt())} · {lesson.vehiclePlate}
            </p>
          </div>
          <div className="shrink-0 text-right text-sm font-medium text-primary">
            {formatTime(lesson.startsAt())}
            <span className="text-muted"> – {formatTime(lesson.endsAt())}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
