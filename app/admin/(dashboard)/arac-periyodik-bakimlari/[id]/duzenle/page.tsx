import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { VehicleRepository } from "../../../araclar/vehicle.repository";
import { VehiclePeriodicCheckRepository } from "../../vehicle-periodic-check.repository";
import { VehiclePeriodicCheckForm } from "../../vehicle-periodic-check-form";
import { deletePeriodicCheck } from "../../actions";

export default async function EditPeriodicCheckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const check = await new VehiclePeriodicCheckRepository(supabase).findById(id);
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Periyodik kontrolü düzenle</h1>
        <DeleteButton
          action={deletePeriodicCheck.bind(null, id)}
          confirmMessage="Bu kontrol silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <VehiclePeriodicCheckForm
        vehicles={vehicles.map((vehicle) => vehicle.toOption())}
        check={check.toFormCheck()}
      />
    </section>
  );
}
