"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NationalIdInput } from "@/components/ui/national-id-input";
import { Button } from "@/components/ui/button";
import { isValidNationalId } from "./validation";

export function LookupFormWithAnimation({
  defaultValue,
  onDrivingChange,
}: {
  defaultValue?: string;
  onDrivingChange: (driving: boolean) => void;
}) {
  const router = useRouter();
  const [driving, setDriving] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!isValidNationalId(value)) return;
    event.preventDefault();
    setDriving(true);
    onDrivingChange(true);
    window.setTimeout(() => {
      router.push(`/?national_id=${value}`);
    }, 900);
  }

  return (
    <form action="/" onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        TC Kimlik No
        <NationalIdInput
          defaultValue={defaultValue}
          required={false}
          onValueChange={setValue}
        />
      </label>
      <Button type="submit" disabled={driving}>
        {driving ? "Sorgulanıyor..." : "Sorgula"}
      </Button>
    </form>
  );
}
