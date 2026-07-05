import { updateInstallment } from "../actions";
import { DatePicker } from "@/components/ui/date-picker";
import type { PaymentInstallment } from "../payment-installment.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700";

export function EditInstallmentForm({ installment }: { installment: PaymentInstallment }) {
  return (
    <form action={updateInstallment.bind(null, installment.id)} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="student_id" value={installment.studentId} />
      <label className="flex flex-col gap-1 text-sm">
        Amount
        <input
          name="amount"
          type="number"
          step="0.01"
          required
          defaultValue={installment.amount}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Due date
        <DatePicker
          name="due_date"
          required
          defaultValue={installment.dueDate().toISOString().slice(0, 10)}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        Save changes
      </button>
    </form>
  );
}
