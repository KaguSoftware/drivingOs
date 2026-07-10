import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createPortalAccount } from "@/lib/accounts";
import { internalEmailForPhone } from "@/lib/phone";

// Resolves a student's stored login email from their phone number, so the
// "/" phone entrance can sign them in (via a magic-link token, not a
// password) without real Supabase phone/OTP auth. Service-role only
// (bypasses RLS) — never import into client code.
//
// `normalizedPhone` must be the 10-digit form from `normalizeTrPhone`;
// `students.phone` is stored as `+90${10 digits}` (see
// app/admin/(dashboard)/ogrenciler/actions.ts), so we re-add the prefix
// before querying.
//
// Students created/edited before the account-provisioning flow shipped
// (students.email predates it — see migration 0015) have no email/portal
// account yet. Rather than requiring an admin to re-open and re-save every
// such student, we backfill the account here on first login attempt.
export async function resolveStudentEmailByPhone(
  normalizedPhone: string
): Promise<string | null> {
  const admin = createSupabaseAdminClient();
  const phone = `+90${normalizedPhone}`;
  const { data: student } = await admin
    .from("students")
    .select("id, email")
    .eq("phone", phone)
    .maybeSingle();
  if (!student) return null;
  if (student.email) return student.email;

  const email = internalEmailForPhone(phone);
  const { error } = await admin.from("students").update({ email }).eq("id", student.id);
  if (error) return null;
  await createPortalAccount({ email, role: "student", linkId: student.id });
  return email;
}
