import { createPeriodicCheck } from "./actions";
import { CHECK_TYPES } from "./types";
import type { Vehicle } from "../vehicles/vehicle.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function VehiclePeriodicCheckForm({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <form action={createPeriodicCheck} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Vehicle
        <select name="vehicle_id" required className={inputClass}>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate} &middot; {vehicle.makeModel}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Check type
        <select name="check_type" required className={inputClass}>
          {CHECK_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Due date
        <input name="due_date" type="date" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Cost
        <input name="cost" type="number" step="0.01" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Provider
        <input name="provider" className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Add check
      </button>
    </form>
  );
}
