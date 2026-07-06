import { createViolation, updateViolation } from "../violation-actions";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import type { VehicleViolation } from "../vehicle-violation.model";

export function ViolationForm({
  vehicleId,
  violation,
}: {
  vehicleId: string;
  violation?: VehicleViolation;
}) {
  const action = violation ? updateViolation.bind(null, violation.id) : createViolation;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      <label className="flex flex-col gap-1 text-sm">
        Violation type
        <input
          name="violation_type"
          required
          defaultValue={violation?.violationType}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Date
        <DatePicker
          name="violation_date"
          required
          defaultValue={violation?.violationDate().toISOString().slice(0, 10)}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Fine amount
        <input
          name="fine_amount"
          type="number"
          step="0.01"
          defaultValue={violation?.fineAmount ?? undefined}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description
        <input name="description" defaultValue={violation?.description ?? undefined} className={inputClass} />
      </label>
      <Button type="submit">
        {violation ? "Save changes" : "Add violation"}
      </Button>
    </form>
  );
}
