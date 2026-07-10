import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { InstructorRepository } from "../../instructor.repository";
import { TutorForm } from "../../tutor-form";
import { loadVehicleOptions } from "../../vehicle-options";
import { deleteInstructor } from "../../actions";
import { AvailabilityRepository } from "../../../../../egitmen/(panel)/musaitlik/availability.repository";
import { AvailabilityEditor } from "../../availability-editor";
import { BlockedDatesEditor } from "../../blocked-dates-editor";

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const instructor = await new InstructorRepository(supabase).findById(id);
  const vehicles = await loadVehicleOptions(supabase);
  const availabilityRepo = new AvailabilityRepository(supabase);
  const [availability, blocked] = await Promise.all([
    availabilityRepo.listAvailability(id),
    availabilityRepo.listBlockedDates(id),
  ]);

  return (
    <section className="flex max-w-xl flex-col gap-8">
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
      <TutorForm instructor={instructor.toFormValues()} vehicles={vehicles} />
      <div>
        <PageHeader title="Müsaitlik" description="Haftalık çalışma saatleri." />
        <div className="mt-3">
          <AvailabilityEditor instructorId={id} rows={availability} />
        </div>
      </div>
      <div>
        <PageHeader title="Kapalı günler" description="İzin ve tatil günleri." />
        <div className="mt-3">
          <BlockedDatesEditor instructorId={id} rows={blocked} />
        </div>
      </div>
    </section>
  );
}
