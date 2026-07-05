import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../../exam-place.repository";
import { ExamPlaceForm } from "../../exam-place-form";

export default async function EditExamPlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const examPlace = await new ExamPlaceRepository(supabase).findById(id);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit exam place</h1>
      <ExamPlaceForm examPlace={examPlace} />
    </section>
  );
}
