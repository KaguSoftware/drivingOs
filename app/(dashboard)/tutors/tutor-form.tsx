import { createInstructor, updateInstructor } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { LICENSE_CLASSES } from "../students/types";
import type { Instructor } from "./instructor.model";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function TutorForm({ instructor }: { instructor?: Instructor }) {
  const action = instructor ? updateInstructor.bind(null, instructor.id) : createInstructor;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Full name
        <FullNameInput defaultValue={instructor?.fullName} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone
        <div className="flex items-center rounded-md border border-zinc-300 bg-transparent text-sm dark:border-zinc-700">
          <span className="px-3 py-2 text-zinc-500">+90</span>
          <PhoneInput defaultValue={instructor?.phone.replace(/^\+90/, "")} />
        </div>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        License classes
        <select
          name="license_classes"
          multiple
          required
          defaultValue={instructor?.licenseClasses as string[] | undefined}
          className={`${inputClass} h-32`}
        >
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
        {instructor ? "Save changes" : "Register tutor"}
      </button>
    </form>
  );
}
