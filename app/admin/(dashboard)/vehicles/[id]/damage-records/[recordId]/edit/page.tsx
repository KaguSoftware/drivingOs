import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleDamageRecordRepository } from "../../../../vehicle-damage-record.repository";
import { DamageRecordForm } from "../../../damage-record-form";

export default async function EditDamageRecordPage({
  params,
}: {
  params: Promise<{ id: string; recordId: string }>;
}) {
  const { id, recordId } = await params;
  const supabase = await createSupabaseServerClient();
  const record = await new VehicleDamageRecordRepository(supabase).findById(recordId);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit damage record</h1>
      <DamageRecordForm vehicleId={id} record={record} />
    </section>
  );
}
