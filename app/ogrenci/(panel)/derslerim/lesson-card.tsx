import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cancelLesson } from "./actions";

export interface StudentLessonView {
  id: string;
  when: string;
  instructorName: string;
  vehiclePlate: string;
  cancellable: boolean;
  isPast: boolean;
}

// One lesson row for the student panel. Cancel is only offered when the
// lesson is ≥24h away (the RPC enforces this server-side too).
export function LessonCard({ lesson }: { lesson: StudentLessonView }) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm ${
        lesson.isPast ? "opacity-70" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="font-medium text-primary">{lesson.when}</p>
        <p className="text-xs text-muted">
          {lesson.instructorName} · {lesson.vehiclePlate}
        </p>
      </div>
      {lesson.cancellable ? (
        <ConfirmDialog
          message="Bu ders iptal edilsin mi?"
          confirmLabel="Dersi iptal et"
          action={cancelLesson.bind(null, lesson.id)}
          trigger={(show) => (
            <button
              type="button"
              onClick={show}
              className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm text-danger hover:bg-danger-soft"
            >
              İptal et
            </button>
          )}
        />
      ) : (
        !lesson.isPast && (
          <span className="shrink-0 text-xs text-muted">24 saat kala iptal edilemez</span>
        )
      )}
    </li>
  );
}
