import { createInstallment } from "./actions";
import { DatePicker } from "@/components/ui/date-picker";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import type { Student } from "../ogrenciler/student.model";

export function InstallmentForm({ students }: { students: Student[] }) {
  return (
    <form action={createInstallment} className="flex max-w-md flex-col gap-4">
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
        Vade tarihi (bölünmüşse ilk taksit)
        <DatePicker name="due_date" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Ay sayısı (toplam = tutar &times; ay sayısı)
        <input name="months" type="number" min={1} step={1} defaultValue={1} className={inputClass} />
      </label>
      <Button type="submit">Taksit ekle</Button>
    </form>
  );
}
