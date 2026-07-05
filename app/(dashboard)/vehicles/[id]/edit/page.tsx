import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../../vehicle.repository";
import { VehicleForm } from "../../vehicle-form";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const vehicle = await new VehicleRepository(supabase).findById(id);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit vehicle</h1>
      <VehicleForm vehicle={vehicle} />
    </section>
  );
}
