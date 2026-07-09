"use client";

import { forwardRef } from "react";
import { inputClass } from "./input-classes";

export const NationalIdInput = forwardRef<
  HTMLInputElement,
  { defaultValue?: string; required?: boolean }
>(function NationalIdInput({ defaultValue, required = true }, ref) {
  return (
    <input
      ref={ref}
      name="national_id"
      type="text"
      inputMode="numeric"
      required={required}
      pattern="\d{11}"
      maxLength={11}
      title="Tam olarak 11 hane girin"
      placeholder="12345678901"
      defaultValue={defaultValue}
      className={inputClass}
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/\D/g, "").slice(0, 11);
      }}
    />
  );
});
