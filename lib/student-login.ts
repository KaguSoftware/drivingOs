import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Resolves a student's stored login email from their phone number, so the
// "/" phone entrance can sign them in (via a magic-link token, not a
// password) without real Supabase phone/OTP auth. Service-role only
// (bypasses RLS) — never import into client code.
//
// `normalizedPhone` must be the 10-digit form from `normalizeTrPhone`;
// `students.phone` is stored as `+90${10 digits}` (see
// app/admin/(dashboard)/ogrenciler/actions.ts), so we re-add the prefix
// before querying.
export async function resolveStudentEmailByPhone(
  normalizedPhone: string
): Promise<string | null> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("students")
    .select("email")
    .eq("phone", `+90${normalizedPhone}`)
    .not("email", "is", null)
    .limit(1)
    .maybeSingle();

  return data?.email ?? null;
}
