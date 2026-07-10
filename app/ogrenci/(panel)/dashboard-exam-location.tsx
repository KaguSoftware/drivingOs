import type { UpcomingExam } from "./upcoming-exam.model";

export function DashboardExamLocation({ exam }: { exam: UpcomingExam | null }) {
  if (!exam) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-surface text-sm text-muted">
        Sınav yeriniz belli olduğunda burada görüntülenecek.
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-64">
      <iframe
        src={exam.mapsEmbedUrl()}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        title={`${exam.placeName} konumu`}
      />
    </div>
  );
}
