import { createDamageRecord } from "../actions";
import { DAMAGE_STATUSES } from "../types";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function DamageRecordForm({ vehicleId }: { vehicleId: string }) {
  return (
    <form action={createDamageRecord} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      <label className="flex flex-col gap-1 text-sm">
        Part name
        <input name="part_name" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Status
        <select name="status" required defaultValue="reported" className={inputClass}>
          {DAMAGE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Notes
        <input name="notes" className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Add damage record
      </button>
    </form>
  );
}
