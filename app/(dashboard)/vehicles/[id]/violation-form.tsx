import { createViolation } from "../actions";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function ViolationForm({ vehicleId }: { vehicleId: string }) {
  return (
    <form action={createViolation} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      <label className="flex flex-col gap-1 text-sm">
        Violation type
        <input name="violation_type" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Date
        <input name="violation_date" type="date" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Fine amount
        <input name="fine_amount" type="number" step="0.01" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description
        <input name="description" className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Add violation
      </button>
    </form>
  );
}
