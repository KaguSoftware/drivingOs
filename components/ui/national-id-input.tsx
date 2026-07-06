"use client";

import { inputClass } from "./input-classes";

export function NationalIdInput({
  defaultValue,
  required = true,
}: {
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <input
      name="national_id"
      type="text"
      inputMode="numeric"
      required={required}
      pattern="\d{11}"
      maxLength={11}
      title="Enter exactly 11 digits"
      placeholder="12345678901"
      defaultValue={defaultValue}
      className={inputClass}
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/\D/g, "").slice(0, 11);
      }}
    />
  );
}
