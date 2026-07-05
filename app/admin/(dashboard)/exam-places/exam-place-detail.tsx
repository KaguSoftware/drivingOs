export function ExamPlaceDetail({
  name,
  address,
  notes,
  mapsEmbedUrl,
}: {
  name: string;
  address: string;
  notes: string | null;
  mapsEmbedUrl: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{address}</p>
      </div>

      {notes && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Notes</h2>
          <p className="text-base leading-relaxed">{notes}</p>
        </div>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Location</h2>
        <iframe
          title={name}
          src={mapsEmbedUrl}
          className="h-96 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
          loading="lazy"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          This is a demo embed with no API key. Live geocoding and address autocomplete would
          require setting NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
        </p>
      </section>
    </div>
  );
}
