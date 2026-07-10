import type { UpcomingExam } from "./upcoming-exam.model";

export function DashboardVideo({ exam }: { exam: UpcomingExam | null }) {
  const videoUrl = exam?.youtubeEmbedUrl() ?? null;

  if (!videoUrl) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-surface text-sm text-muted">
        Bu sınav türü için henüz video eklenmedi.
      </div>
    );
  }

  return (
    <iframe
      src={videoUrl}
      className="h-full min-h-64 w-full border-0"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Sınav tanıtım videosu"
    />
  );
}
