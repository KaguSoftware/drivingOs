export function ExamPlaceDetail({
  name,
  address,
  notes,
  mapsEmbedUrl,
  youtubeEmbedUrl,
}: {
  name: string;
  address: string;
  notes: string | null;
  mapsEmbedUrl: string;
  youtubeEmbedUrl: string | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="mt-1 text-sm text-muted">{address}</p>
      </div>

      {notes && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-1 text-sm font-medium text-muted">Notlar</h2>
          <p className="text-base leading-relaxed">{notes}</p>
        </div>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Konum</h2>
        <iframe
          title={name}
          src={mapsEmbedUrl}
          className="h-96 w-full rounded-lg border border-border"
          loading="lazy"
        />
        <p className="text-xs text-muted">
          Bu, API anahtarı olmayan bir demo gömme. Canlı konum çözümleme ve adres otomatik
          tamamlama için NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ayarlanması gerekir.
        </p>
      </section>

      {youtubeEmbedUrl && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Video</h2>
          <iframe
            title={`${name} video`}
            src={youtubeEmbedUrl}
            className="aspect-video w-full rounded-lg border border-border"
            loading="lazy"
            allowFullScreen
          />
        </section>
      )}
    </div>
  );
}
