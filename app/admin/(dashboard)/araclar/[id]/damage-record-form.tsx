import { createDamageRecord, updateDamageRecord } from "../damage-record-actions";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { DAMAGE_STATUSES } from "../types";
import { VehicleDamageRecord } from "../vehicle-damage-record.model";

export function DamageRecordForm({
  vehicleId,
  record,
}: {
  vehicleId: string;
  record?: VehicleDamageRecord;
}) {
  const action = record ? updateDamageRecord.bind(null, record.id) : createDamageRecord;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      <label className="flex flex-col gap-1 text-sm">
        Parça adı
        <input name="part_name" required defaultValue={record?.partName} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Durum
        <select name="status" required defaultValue={record?.status ?? "reported"} className={inputClass}>
          {DAMAGE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {VehicleDamageRecord.statusLabelFor(status)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Notlar
        <input name="notes" defaultValue={record?.notes ?? undefined} className={inputClass} />
      </label>
      <SubmitButton>
        {record ? "Değişiklikleri kaydet" : "Hasar kaydı ekle"}
      </SubmitButton>
    </form>
  );
}
