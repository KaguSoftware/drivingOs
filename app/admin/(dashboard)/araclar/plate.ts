// Turkish license plate format: 2-digit province code (01-81),
// 2-3 letter group, then up to 4 digits. e.g. "34 AB 1234", "06 ABC 12".

export interface PlateParts {
  province: string; // 2 digits
  letters: string; // 2-3 letters
  numbers: string; // 1-4 digits
}

export function sanitizeProvince(value: string): string {
  return value.replace(/\D/g, "").slice(0, 2);
}

export function sanitizeLetters(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
}

export function sanitizeNumbers(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function formatPlate({ province, letters, numbers }: PlateParts): string {
  return [province, letters, numbers].filter(Boolean).join(" ");
}

export function parsePlate(plate: string): PlateParts {
  const match = plate.trim().match(/^(\d{2})\s*([A-Za-z]{2,3})\s*(\d{1,4})$/);
  if (!match) return { province: "", letters: "", numbers: "" };
  return {
    province: match[1],
    letters: match[2].toUpperCase(),
    numbers: match[3],
  };
}

export function isValidPlate(plate: string): boolean {
  const parts = parsePlate(plate);
  if (!parts.province) return false;
  const province = Number(parts.province);
  return province >= 1 && province <= 81;
}
