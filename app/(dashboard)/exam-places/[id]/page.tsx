import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../exam-place.repository";

export default async function ExamPlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const place = await new ExamPlaceRepository(supabase).findById(id);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{place.name}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{place.address}</p>
        {place.notes && <p className="text-sm text-zinc-500 dark:text-zinc-400">{place.notes}</p>}
      </div>

      <iframe
        title={place.name}
        src={place.mapsEmbedUrl()}
        className="h-96 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
        loading="lazy"
      />

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        This is a demo embed with no API key. Live geocoding and address autocomplete would
        require setting NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
      </p>
    </section>
  );
}
