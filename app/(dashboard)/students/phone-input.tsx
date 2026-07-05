"use client";

export function PhoneInput() {
  return (
    <input
      name="phone"
      type="tel"
      inputMode="numeric"
      required
      pattern="\d{10}"
      maxLength={10}
      title="Enter exactly 10 digits"
      placeholder="5551234567"
      className="w-full bg-transparent py-2 pr-3 text-sm outline-none"
      onInput={(event) => {
        const input = event.currentTarget;
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
      }}
    />
  );
}
