import { createDamageRecord, updateDamageRecord } from "../damage-record-actions";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import { DAMAGE_STATUSES } from "../types";
import type { VehicleDamageRecord } from "../vehicle-damage-record.model";

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
        Part name
        <input name="part_name" required defaultValue={record?.partName} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Status
        <select name="status" required defaultValue={record?.status ?? "reported"} className={inputClass}>
          {DAMAGE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Notes
        <input name="notes" defaultValue={record?.notes ?? undefined} className={inputClass} />
      </label>
      <Button type="submit">
        {record ? "Save changes" : "Add damage record"}
      </Button>
    </form>
  );
}
