import { EmptyState } from "@/components/ui/empty-state";
import type { Lesson } from "../../program/lesson.model";

function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <li className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
      <div>
        <p className="font-medium">
          {lesson.startsAt().toLocaleDateString("tr-TR")}{" "}
          {lesson.startsAt().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="text-xs text-muted">{lesson.instructorName} · {lesson.vehiclePlate}</p>
      </div>
    </li>
  );
}

export function StudentLessonsCard({
  upcoming,
  completed,
}: {
  upcoming: Lesson[];
  completed: Lesson[];
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground">Direksiyon dersleri</h2>

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
        Yaklaşan ({upcoming.length})
      </p>
      {upcoming.length === 0 ? (
        <EmptyState title="Yaklaşan ders yok" />
      ) : (
        <ul className="mt-1 divide-y divide-border">
          {upcoming.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
        Geçmiş ({completed.length})
      </p>
      {completed.length === 0 ? (
        <p className="mt-1 text-sm text-muted">Henüz tamamlanan ders yok.</p>
      ) : (
        <ul className="mt-1 divide-y divide-border">
          {completed.slice(0, 5).map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      )}
    </div>
  );
}
