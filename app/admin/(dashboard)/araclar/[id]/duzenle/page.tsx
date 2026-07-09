import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { VehicleRepository } from "../../vehicle.repository";
import { VehicleForm } from "../../vehicle-form";
import { deleteVehicle } from "../../actions";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const vehicle = await new VehicleRepository(supabase).findById(id);

  return (
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Aracı düzenle</h1>
        <DeleteButton
          action={deleteVehicle.bind(null, id)}
          confirmMessage="Bu araç silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <VehicleForm vehicle={vehicle} />
    </section>
  );
}
