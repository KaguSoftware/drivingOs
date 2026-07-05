"use client";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700";

export function FullNameInput() {
  return (
    <input
      name="full_name"
      required
      pattern="[^0-9]*"
      title="Name cannot contain numbers"
      placeholder="John Doe"
      className={inputClass}
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/[0-9]/g, "");
      }}
    />
  );
}
