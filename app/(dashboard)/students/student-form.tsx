import { createStudent, updateStudent } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { NationalIdInput } from "./national-id-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { LICENSE_CLASSES } from "./types";
import type { Student } from "./student.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function StudentForm({ student }: { student?: Student }) {
  const action = student ? updateStudent.bind(null, student.id) : createStudent;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Full name
        <FullNameInput defaultValue={student?.fullName} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone
        <div className="flex items-center rounded-md border border-zinc-300 bg-transparent text-sm dark:border-zinc-700">
          <span className="px-3 py-2 text-zinc-500">+90</span>
          <PhoneInput defaultValue={student?.phone.replace(/^\+90/, "")} />
        </div>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        National ID (TC Kimlik No)
        <NationalIdInput defaultValue={student?.nationalId} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License class
        <select name="license_class" required defaultValue={student?.licenseClass} className={inputClass}>
          {LICENSE_CLASSES.map((licenseClass) => (
            <option key={licenseClass} value={licenseClass}>
              {licenseClass}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {student ? "Save changes" : "Register student"}
      </button>
    </form>
  );
}
