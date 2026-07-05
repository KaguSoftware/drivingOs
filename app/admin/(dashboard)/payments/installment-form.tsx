import { createInstallment } from "./actions";
import { DatePicker } from "@/components/ui/date-picker";
import type { Student } from "../students/student.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-left text-sm dark:border-zinc-700";

export function InstallmentForm({ students }: { students: Student[] }) {
  return (
    <form action={createInstallment} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Student
        <select name="student_id" required className={inputClass}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Amount
        <input name="amount" type="number" step="0.01" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Due date (first installment if split)
        <DatePicker name="due_date" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Number of months
        <input name="months" type="number" min={1} step={1} defaultValue={1} className={inputClass} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        Add installment
      </button>
    </form>
  );
}
