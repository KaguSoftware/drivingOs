"use client";

import { useActionState } from "react";
import { createPeriodicCheck, updatePeriodicCheck } from "./actions";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { CHECK_TYPES, type CheckFormCheck, type CheckFormVehicle } from "./types";

export function VehiclePeriodicCheckForm({
  vehicles,
  check,
}: {
  vehicles: CheckFormVehicle[];
  check?: CheckFormCheck;
}) {
  const [result, formAction] = useActionState(
    check ? updatePeriodicCheck.bind(null, check.id) : createPeriodicCheck,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Araç
          <select name="vehicle_id" required defaultValue={check?.vehicleId} className={inputClass}>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.plate} &middot; {vehicle.makeModel}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Kontrol türü
          <select name="check_type" required defaultValue={check?.checkType} className={inputClass}>
            {CHECK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Vade tarihi
          <DatePicker
            name="due_date"
            required
            defaultValue={check?.dueDate}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Ücret
          <input name="cost" type="number" step="0.01" defaultValue={check?.cost ?? undefined} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Sağlayıcı
          <input name="provider" defaultValue={check?.provider ?? undefined} className={inputClass} />
        </label>
      </div>
      <FormFeedback result={result} />
      <SubmitButton>
        {check ? "Değişiklikleri kaydet" : "Kontrol ekle"}
      </SubmitButton>
    </form>
  );
}
