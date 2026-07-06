import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { ExamPlaceRepository } from "../../exam-place.repository";
import { ExamPlaceForm } from "../../exam-place-form";
import { deleteExamPlace } from "../../actions";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit exam place</h1>
        <DeleteButton action={deleteExamPlace.bind(null, id)} confirmMessage="Delete this exam place?" />
      </div>
      <ExamPlaceForm
        id={examPlace.id}
        name={examPlace.name}
        address={examPlace.address}
        notes={examPlace.notes}
        youtubeUrl={examPlace.youtubeUrl}
      />
    </section>
  );
}
