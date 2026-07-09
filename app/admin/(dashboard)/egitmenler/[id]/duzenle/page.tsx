import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { InstructorRepository } from "../../instructor.repository";
import { TutorForm } from "../../tutor-form";
import { loadVehicleOptions } from "../../vehicle-options";
import { deleteInstructor } from "../../actions";

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const instructor = await new InstructorRepository(supabase).findById(id);
  const vehicles = await loadVehicleOptions(supabase);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Eğitmeni düzenle</h1>
        <DeleteButton
          action={deleteInstructor.bind(null, id)}
          confirmMessage="Bu eğitmen silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <TutorForm instructor={instructor} vehicles={vehicles} />
    </section>
  );
}
