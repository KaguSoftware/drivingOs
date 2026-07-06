import type { UpcomingExam } from "./exam-lookup.model";
import { StoreBadges } from "./store-badges";
import { Logo } from "./logo";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export function StudentWelcomeScreen({
  studentFullName,
  exams,
}: {
  studentFullName: string;
  exams: UpcomingExam[];
}) {
  const [primary, ...rest] = exams;
  const videoUrl = primary?.youtubeEmbedUrl() ?? null;

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="grid grid-rows-2">
        <div className="flex flex-col justify-center gap-4 p-8">
          <Logo />

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted">Hoş geldin</p>
            <h1 className="text-3xl font-semibold">{studentFullName}</h1>
            {primary && <p className="text-muted">{primary.placeName}</p>}
          </div>

          <div>
            <p className="text-sm text-muted">Sınav Tarihi</p>
            {primary ? (
              <>
                <p className="text-lg font-medium">
                  {dateFormatter.formatRange(primary.startsAt(), primary.endsAt())}
                </p>
                {rest.length > 0 && (
                  <p className="mt-1 text-sm text-muted">+{rest.length} yaklaşan sınav daha</p>
                )}
              </>
            ) : (
              <p className="text-lg font-medium">Yaklaşan bir sınavınız bulunmuyor.</p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm text-muted">Ehliyet Sınavı Çalışma Uygulaması</p>
            <StoreBadges />
          </div>
        </div>

        <div className="border-t border-border p-8">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="h-full w-full rounded-md border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Sınav tanıtım videosu"
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-md bg-surface text-sm text-muted">
              Bu sınav türü için henüz video eklenmedi.
            </div>
          )}
        </div>
      </div>

      <div className="relative min-h-64 bg-surface">
        {primary ? (
          <iframe
            src={primary.mapsEmbedUrl()}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            title={`${primary.placeName} konumu`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Sınav yeriniz belli olduğunda burada görüntülenecek.
          </div>
        )}
      </div>
    </div>
  );
}
