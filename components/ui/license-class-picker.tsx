import type { LicenseClass } from "@/app/admin/(dashboard)/ogrenciler/types";
import { LICENSE_CLASS_ICONS } from "./license-class-icons";

// Checkbox grid for picking one or more license classes.
// Used by student and instructor forms.
export function LicenseClassPicker({
  classes,
  selected = [],
  legend = "Ehliyet sınıfları",
}: {
  classes: readonly string[];
  selected?: readonly string[];
  legend?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2 text-sm">
      <legend className="mb-1 font-medium">{legend}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {classes.map((licenseClass) => {
          const ClassIcon = LICENSE_CLASS_ICONS[licenseClass as LicenseClass];
          return (
            <label
              key={licenseClass}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 transition-colors hover:border-primary has-checked:border-primary has-checked:bg-info-soft"
            >
              <input
                type="checkbox"
                name="license_classes"
                value={licenseClass}
                defaultChecked={selected.includes(licenseClass)}
                className="accent-primary"
              />
              {ClassIcon && <ClassIcon className="h-4 w-4 shrink-0 text-muted" />}
              <span className="font-medium">{licenseClass}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
