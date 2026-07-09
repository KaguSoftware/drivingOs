import { EmptyState } from "@/components/ui/empty-state";
import type { ExamEnrollment } from "../../sinavlar/exam-enrollment.model";

export function StudentExamsCard({ enrollments }: { enrollments: ExamEnrollment[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground">Sınav kayıtları ({enrollments.length})</h2>

      {enrollments.length === 0 ? (
        <EmptyState title="Henüz sınav kaydı yok" />
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {enrollments.map((enrollment) => (
            <li key={enrollment.id} className="flex items-center justify-between gap-2 px-1 py-3 text-sm">
              <div>
                <p className="font-medium">{enrollment.examPlaceName}</p>
                <p className="text-xs text-muted">
                  {enrollment.examStartsAt()?.toLocaleDateString("tr-TR") ?? "-"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
