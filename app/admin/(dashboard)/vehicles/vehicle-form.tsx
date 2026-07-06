import { createVehicle, updateVehicle } from "./actions";
import { PlateInput } from "./plate-input";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import { LICENSE_CLASSES, TRANSMISSIONS } from "./types";
import type { Vehicle } from "./vehicle.model";

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const action = vehicle ? updateVehicle.bind(null, vehicle.id) : createVehicle;
  const [make, model] = vehicle ? vehicle.makeModel.split(" ", 2) : ["", ""];

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <PlateInput defaultValue={vehicle?.plate} />
      <label className="flex flex-col gap-1 text-sm">
        Brand
        <input name="make" required placeholder="Renault" defaultValue={make} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Model
        <input name="model" required placeholder="Twingo" defaultValue={model} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Transmission
        <select name="transmission" required defaultValue={vehicle?.transmission} className={inputClass}>
          {TRANSMISSIONS.map((transmission) => (
            <option key={transmission} value={transmission}>
              {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License class
        <select name="license_class" required defaultValue={vehicle?.licenseClass} className={inputClass}>
          {LICENSE_CLASSES.map((licenseClass) => (
            <option key={licenseClass} value={licenseClass}>
              {licenseClass}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">
        {vehicle ? "Save changes" : "Add vehicle"}
      </Button>
    </form>
  );
}
