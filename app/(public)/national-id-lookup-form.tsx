"use client";

import { useRef } from "react";
import { NationalIdInput } from "@/components/ui/national-id-input";
import { Button } from "@/components/ui/button";

export function NationalIdLookupForm({
  defaultValue,
  onSubmitValue,
}: {
  defaultValue?: string;
  onSubmitValue: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex max-w-md flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitValue(inputRef.current?.value ?? "");
      }}
    >
      <label className="flex flex-col gap-1 text-sm">
        TC Kimlik No
        <NationalIdInput ref={inputRef} defaultValue={defaultValue} required={false} />
      </label>
      <Button type="submit">Sorgula</Button>
    </form>
  );
}