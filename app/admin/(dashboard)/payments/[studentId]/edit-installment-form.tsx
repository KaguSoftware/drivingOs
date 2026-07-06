import { updateInstallment } from "../actions";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import type { PaymentInstallment } from "../payment-installment.model";

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
      <Button type="submit">Save changes</Button>
    </form>
  );
}
