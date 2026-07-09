"use client";

import { useActionState } from "react";
import { updateInstallment } from "../actions";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import type { InstallmentFormInstallment } from "../types";

export function EditInstallmentForm({ installment }: { installment: InstallmentFormInstallment }) {
  const [result, formAction] = useActionState(updateInstallment.bind(null, installment.id), null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="student_id" value={installment.studentId} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Tutar
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
          Vade tarihi
          <DatePicker
            name="due_date"
            required
            defaultValue={installment.dueDate}
            className={inputClass}
          />
        </label>
      </div>
      <FormFeedback result={result} />
      <SubmitButton>Değişiklikleri kaydet</SubmitButton>
    </form>
  );
}
