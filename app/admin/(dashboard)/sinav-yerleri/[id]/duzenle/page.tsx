import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
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
    <section className="flex max-w-2xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sınav yerini düzenle</h1>
        <DeleteButton
          action={deleteExamPlace.bind(null, id)}
          confirmMessage="Bu sınav yeri silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
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
