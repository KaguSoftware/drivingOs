import { createInstructor, updateInstructor } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { LICENSE_CLASSES } from "../ogrenciler/types";
import type { Instructor } from "./instructor.model";

export function TutorForm({ instructor }: { instructor?: Instructor }) {
  const action = instructor ? updateInstructor.bind(null, instructor.id) : createInstructor;

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Ad Soyad
        <FullNameInput defaultValue={instructor?.fullName} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Telefon
        <div className="flex items-center rounded-md border border-border bg-surface text-sm">
          <span className="px-3 py-2 text-muted">+90</span>
          <PhoneInput defaultValue={instructor?.phone.replace(/^\+90/, "")} />
        </div>
      </label>
      <fieldset className="flex flex-col gap-1 text-sm">
        <legend className="mb-1">Ehliyet sınıfları</legend>
        <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-surface">
          {LICENSE_CLASSES.map((licenseClass) => (
            <label
              key={licenseClass}
              className="flex items-center gap-3 px-3 py-2 hover:bg-background"
            >
              <input
                type="checkbox"
                name="license_classes"
                value={licenseClass}
                defaultChecked={instructor?.licenseClasses.includes(licenseClass)}
              />
              {licenseClass}
            </label>
          ))}
        </div>
      </fieldset>
      <Button type="submit">
        {instructor ? "Değişiklikleri kaydet" : "Eğitmen kaydet"}
      </Button>
    </form>
  );
}
