import { createInstructor } from "./actions";
import { LICENSE_CLASSES } from "../students/types";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function TutorForm() {
  return (
    <form action={createInstructor} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Full name
        <input name="full_name" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone
        <input name="phone" type="tel" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License classes
        <select name="license_classes" multiple required className={`${inputClass} h-32`}>
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
        Register tutor
      </button>
    </form>
  );
}
