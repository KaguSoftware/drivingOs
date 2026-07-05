import { createPeriodicCheck, updatePeriodicCheck } from "./actions";
import { DatePicker } from "@/components/ui/date-picker";
import { CHECK_TYPES } from "./types";
import type { Vehicle } from "../vehicles/vehicle.model";
import type { VehiclePeriodicCheck } from "./vehicle-periodic-check.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700";

export function VehiclePeriodicCheckForm({
  vehicles,
  check,
}: {
  vehicles: Vehicle[];
  check?: VehiclePeriodicCheck;
}) {
  const action = check ? updatePeriodicCheck.bind(null, check.id) : createPeriodicCheck;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Vehicle
        <select name="vehicle_id" required defaultValue={check?.vehicleId} className={inputClass}>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.plate} &middot; {vehicle.makeModel}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Check type
        <select name="check_type" required defaultValue={check?.checkType} className={inputClass}>
          {CHECK_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Due date
        <DatePicker
          name="due_date"
          required
          defaultValue={check?.dueDate().toISOString().slice(0, 10)}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Cost
        <input name="cost" type="number" step="0.01" defaultValue={check?.cost ?? undefined} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Provider
        <input name="provider" defaultValue={check?.provider ?? undefined} className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        {check ? "Save changes" : "Add check"}
      </button>
    </form>
  );
}
