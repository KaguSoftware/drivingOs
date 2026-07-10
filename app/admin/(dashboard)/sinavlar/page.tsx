import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { ExamSessionRepository } from "./exam-session.repository";
import { ExamSessionTable } from "./exam-session-table";
import { ExamPlaceRepository } from "./yerler/exam-place.repository";
import { ExamPlaceTable } from "./yerler/exam-place-table";
import { ExamSectionTabs } from "./tabs";

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const showPlaces = tab === "places";
  const supabase = await createSupabaseServerClient();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{showPlaces ? "Sınav Yerleri" : "Sınavlar"}</h1>
        {showPlaces ? (
          <Link href="/admin/sinavlar/yerler/yeni" className={primaryLinkClass}>
            Yeni sınav yeri
          </Link>
        ) : (
          <Link href="/admin/sinavlar/yeni" className={primaryLinkClass}>
            Sınav planla
          </Link>
        )}
      </div>
      <ExamSectionTabs active={showPlaces ? "places" : "sessions"} />
      {showPlaces ? (
        <ExamPlaceTable places={await new ExamPlaceRepository(supabase).listAll()} />
      ) : (
        <ExamSessionTable sessions={await new ExamSessionRepository(supabase).listUpcoming()} />
      )}
    </section>
  );
}
