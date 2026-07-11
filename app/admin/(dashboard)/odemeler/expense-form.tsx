"use client";

import { useActionState } from "react";
import { createExpense } from "./expense-actions";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";

export function ExpenseForm() {
  const [result, formAction] = useActionState(createExpense, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Gider adı
        <input name="name" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Tutar (₺)
        <input name="cost" type="number" min="0" step="0.01" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Tarih
        <input name="expense_date" type="date" required className={inputClass} />
      </label>
      <FormFeedback result={result} />
      <SubmitButton>Gider ekle</SubmitButton>
    </form>
  );
}
