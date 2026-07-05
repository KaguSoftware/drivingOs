import { NationalIdInput } from "@/components/ui/national-id-input";

export function NationalIdLookupForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/" className="flex max-w-md flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        TC Kimlik No
        <NationalIdInput defaultValue={defaultValue} required={false} />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        Sorgula
      </button>
    </form>
  );
}
