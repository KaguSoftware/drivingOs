"use client";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function NationalIdInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <input
      name="national_id"
      type="text"
      inputMode="numeric"
      required
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
