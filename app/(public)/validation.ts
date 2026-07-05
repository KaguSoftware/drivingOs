export function isValidNationalId(value: string): boolean {
  return /^\d{11}$/.test(value);
}
