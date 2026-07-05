import { createStudent } from "./actions";
import { FullNameInput } from "./full-name-input";
import { NationalIdInput } from "./national-id-input";
import { PhoneInput } from "./phone-input";
import { LICENSE_CLASSES } from "./types";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function StudentForm() {
  return (
    <form action={createStudent} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Full name
        <FullNameInput />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone
        <div className="flex items-center rounded-md border border-zinc-300 bg-transparent text-sm dark:border-zinc-700">
          <span className="px-3 py-2 text-zinc-500">+90</span>
          <PhoneInput />
        </div>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        National ID (TC Kimlik No)
        <NationalIdInput />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License class
        <select name="license_class" required className={inputClass}>
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
        Register student
      </button>
    </form>
  );
}
