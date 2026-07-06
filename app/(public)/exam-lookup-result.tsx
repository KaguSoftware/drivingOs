export type LookupState = "idle" | "invalid" | "not_found" | "found";

export function ExamLookupResult({ state }: { state: LookupState }) {
  if (state === "idle") return null;

  if (state === "invalid") {
    return <p className="text-sm text-danger">TC Kimlik No 11 haneli olmalıdır.</p>;
  }

  if (state === "not_found") {
    return <p className="text-sm text-danger">Bu TC Kimlik No ile kayıtlı öğrenci bulunamadı.</p>;
  }

  // "found" is rendered as a full-screen layout by StudentWelcomeScreen in page.tsx.
  return null;
}
