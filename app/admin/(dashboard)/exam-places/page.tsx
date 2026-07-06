import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { ExamPlaceRepository } from "./exam-place.repository";
import { ExamPlaceTable } from "./exam-place-table";

export default async function ExamPlacesPage() {
  const supabase = await createSupabaseServerClient();
  const places = await new ExamPlaceRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exam Places</h1>
        <Link href="/admin/exam-places/new" className={primaryLinkClass}>
          New exam place
        </Link>
      </div>
      <ExamPlaceTable places={places} />
    </section>
  );
}
