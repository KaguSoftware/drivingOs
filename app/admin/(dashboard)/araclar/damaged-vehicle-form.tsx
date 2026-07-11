import { createDamageRecord } from "./damage-record-actions";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { DAMAGE_STATUSES } from "./types";
import { VehicleDamageRecord } from "./vehicle-damage-record.model";
import type { Vehicle } from "./vehicle.model";

export function DamagedVehicleForm({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <form action={createDamageRecord} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Araç
          <select name="vehicle_id" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Bir araç seçin
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.plate} &middot; {vehicle.makeModel}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Parça adı
          <input name="part_name" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Durum
          <select name="status" required defaultValue="reported" className={inputClass}>
            {DAMAGE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {VehicleDamageRecord.statusLabelFor(status)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Notlar
          <input name="notes" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Onarım maliyeti (₺)
          <input name="cost" type="number" min="0" step="0.01" className={inputClass} />
        </label>
      </div>
      <SubmitButton>Hasar kaydı ekle</SubmitButton>
    </form>
  );
}
