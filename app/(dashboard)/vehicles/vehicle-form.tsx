import { createVehicle } from "./actions";
import { LICENSE_CLASSES, TRANSMISSIONS } from "./types";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function VehicleForm() {
  return (
    <form action={createVehicle} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Plate
        <input name="plate" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Brand / model
        <input name="make_model" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Transmission
        <select name="transmission" required className={inputClass}>
          {TRANSMISSIONS.map((transmission) => (
            <option key={transmission} value={transmission}>
              {transmission}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License class
        <select name="license_class" required className={inputClass}>
          {LICENSE_CLASSES.map((licenseClass) => (
            <option key={licenseClass} value={licenseClass}>
              {licenseClass}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Add vehicle
      </button>
    </form>
  );
}
