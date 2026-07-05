import { createViolation, updateViolation } from "../violation-actions";
import { DatePicker } from "@/components/ui/date-picker";
import type { VehicleViolation } from "../vehicle-violation.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700";

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
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        {violation ? "Save changes" : "Add violation"}
      </button>
    </form>
  );
}
