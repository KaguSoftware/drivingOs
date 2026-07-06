"use client";

import { inputClass } from "./input-classes";

export function FullNameInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <input
      name="full_name"
      required
      pattern="[^0-9]*"
      title="Name cannot contain numbers"
      placeholder="John Doe"
      defaultValue={defaultValue}
      className={inputClass}
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/[0-9]/g, "");
      }}
    />
  );
}
