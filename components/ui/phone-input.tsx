"use client";

export function PhoneInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <input
      name="phone"
      type="tel"
      inputMode="numeric"
      required
      pattern="\d{10}"
      maxLength={10}
      title="Tam olarak 10 hane girin"
      placeholder="5551234567"
      defaultValue={defaultValue}
      className="w-full bg-transparent py-2 pr-3 text-sm outline-none"
      onFocus={(event) => event.currentTarget.select()}
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
      }}
    />
  );
}
