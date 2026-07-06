import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../exam-place.repository";
import { ExamPlaceDetail } from "../exam-place-detail";

export default async function ExamPlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const place = await new ExamPlaceRepository(supabase).findById(id);

  return (
    <ExamPlaceDetail
      name={place.name}
      address={place.address}
      notes={place.notes}
      mapsEmbedUrl={place.mapsEmbedUrl()}
      youtubeEmbedUrl={place.youtubeEmbedUrl()}
    />
  );
}
