import { createInstructor, updateInstructor } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import { LICENSE_CLASSES } from "../students/types";
import type { Instructor } from "./instructor.model";

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
        <div className="flex items-center rounded-md border border-border bg-surface text-sm">
          <span className="px-3 py-2 text-muted">+90</span>
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
      <Button type="submit">
        {instructor ? "Save changes" : "Register tutor"}
      </Button>
    </form>
  );
}
