import { createDamageRecord, updateDamageRecord } from "../damage-record-actions";
import { DAMAGE_STATUSES } from "../types";
import type { VehicleDamageRecord } from "../vehicle-damage-record.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

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
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        {record ? "Save changes" : "Add damage record"}
      </button>
    </form>
  );
}
