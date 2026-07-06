import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { VehicleDamageRecordRepository } from "../../../../vehicle-damage-record.repository";
import { DamageRecordForm } from "../../../damage-record-form";
import { deleteDamageRecord } from "../../../../damage-record-actions";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit damage record</h1>
        <DeleteButton
          action={deleteDamageRecord.bind(null, recordId, id)}
          confirmMessage="Delete this damage record?"
        />
      </div>
      <DamageRecordForm vehicleId={id} record={record} />
    </section>
  );
}
