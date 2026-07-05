import { createVehicle } from "./actions";
import { PlateInput } from "./plate-input";
import { LICENSE_CLASSES, TRANSMISSIONS } from "./types";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function VehicleForm() {
  return (
    <form action={createVehicle} className="flex max-w-md flex-col gap-4">
      <PlateInput />
      <label className="flex flex-col gap-1 text-sm">
        Brand
        <input name="make" required placeholder="Renault" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Model
        <input name="model" required placeholder="Twingo" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Transmission
        <select name="transmission" required className={inputClass}>
          {TRANSMISSIONS.map((transmission) => (
            <option key={transmission} value={transmission}>
              {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
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
