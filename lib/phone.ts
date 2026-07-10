// Turkish phone number normalization, shared by the admin student form
// (components/ui/phone-input.tsx writes 10 raw digits, stored as
// `+90${10 digits}` in `students.phone`) and the "/" student sign-in flow,
// which accepts a phone number typed in various shapes and must normalize
// it the same way before looking it up.

/**
 * Normalizes a user-typed Turkish phone number to its 10-digit form
 * (no country code, no leading trunk 0), e.g. "+90 555 123 45 67" -> "5551234567".
 * Returns null if the input isn't a valid Turkish phone number.
 */
export function normalizeTrPhone(input: string): string | null {
  let digits = input.replace(/[\s\-()]/g, "");

  if (digits.startsWith("+90")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("0090")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("90") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!/^\d{10}$/.test(digits)) {
    return null;
  }

  return digits;
}

// Students log in by phone number only (see app/(public)/actions.ts) —
// Supabase Auth still needs an email internally to wire up the account, so
// we derive one from the phone number rather than asking the admin for it.
// `phone` is the `+90${10 digits}` form stored on `students.phone`.
export function internalEmailForPhone(phone: string): string {
  return `${phone.replace(/^\+90/, "")}@ogrenci.internal`;
}
