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
    <fieldset className="flex flex-col gap-1.5 text-sm">
      <legend className="mb-1 font-medium">{legend}</legend>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {classes.map((licenseClass) => (
          <label
            key={licenseClass}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:border-primary has-checked:border-primary has-checked:bg-info-soft"
          >
            <input
              type="checkbox"
              name="license_classes"
              value={licenseClass}
              defaultChecked={selected.includes(licenseClass)}
              className="accent-primary"
            />
            <span className="font-medium">{licenseClass}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
