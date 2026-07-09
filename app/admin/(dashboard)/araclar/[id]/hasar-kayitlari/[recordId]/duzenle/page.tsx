import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
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
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hasar kaydını düzenle</h1>
        <DeleteButton
          action={deleteDamageRecord.bind(null, recordId, id)}
          confirmMessage="Bu hasar kaydı silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <DamageRecordForm vehicleId={id} record={record} />
    </section>
  );
}
