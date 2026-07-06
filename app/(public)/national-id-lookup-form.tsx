import { NationalIdInput } from "@/components/ui/national-id-input";
import { Button } from "@/components/ui/button";

export function NationalIdLookupForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/" className="flex max-w-md flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        TC Kimlik No
        <NationalIdInput defaultValue={defaultValue} required={false} />
      </label>
      <Button type="submit">Sorgula</Button>
    </form>
  );
}
