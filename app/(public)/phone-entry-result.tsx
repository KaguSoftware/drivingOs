export type PhoneEntryError = "invalid" | "not_found";

export function PhoneEntryResult({ error }: { error?: string }) {
  if (error === "invalid") {
    return <p className="text-sm text-danger">Geçerli bir telefon numarası girin.</p>;
  }
  if (error === "not_found") {
    return <p className="text-sm text-danger">Bu telefon numarasıyla kayıtlı öğrenci bulunamadı.</p>;
  }
  return null;
}
