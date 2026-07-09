"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createInstallment } from "./actions";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import type { InstallmentFormStudent } from "./types";

export function InstallmentForm({ students }: { students: InstallmentFormStudent[] }) {
  const [result, formAction] = useActionState(createInstallment, null);
  const [monthsInput, setMonthsInput] = useState("1");
  const months = Math.max(1, Number(monthsInput) || 1);
  const [useCustomDates, setUseCustomDates] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="custom_dates" value={useCustomDates ? "true" : "false"} />
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Öğrenci
          <select name="student_id" required className={inputClass}>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Taksit başına tutar
          <input name="amount" type="number" step="0.01" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Ay sayısı (toplam = tutar &times; ay sayısı)
          <input
            name="months"
            type="number"
            min={1}
            step={1}
            value={monthsInput}
            onChange={(event) => setMonthsInput(event.target.value)}
            onBlur={() => setMonthsInput(String(months))}
            className={inputClass}
          />
        </label>
        {useCustomDates ? (
          Array.from({ length: months }, (_, index) => (
            <label key={index} className="flex flex-col gap-1 text-sm">
              {index + 1}. taksit vade tarihi
              <DatePicker name={`due_date_${index}`} required className={inputClass} />
            </label>
          ))
        ) : (
          <label className="flex flex-col gap-1 text-sm">
            Vade tarihi (bölünmüşse ilk taksit)
            <DatePicker name="due_date" required className={inputClass} />
          </label>
        )}
      </div>
      <FormFeedback result={result} />
      <div className="flex flex-col gap-2">
        <SubmitButton>
          {useCustomDates ? "Esnek tarihli taksitleri ekle" : "Sabit tarihli taksit ekle"}
        </SubmitButton>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setUseCustomDates((value) => !value)}
        >
          {useCustomDates ? "Sabit tarihe dön" : "Esnek tarihli taksit ekle"}
        </Button>
      </div>
    </form>
  );
}
