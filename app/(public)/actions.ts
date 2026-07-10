"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchProfile, ROLE_HOME } from "@/lib/roles";
import { normalizeTrPhone } from "@/lib/phone";
import { resolveStudentEmailByPhone } from "@/lib/student-login";

// Passwordless student entrance: the phone number alone identifies the
// student, but authorization still goes through a real Supabase session
// (via a server-generated magic-link token, consumed immediately) so every
// existing RLS-protected read/write (class time requests, lessons, exam
// enrollments) keeps working unchanged.
export async function signInWithPhone(formData: FormData): Promise<void> {
  const raw = String(formData.get("phone") ?? "").trim();
  const normalized = normalizeTrPhone(raw);
  if (!normalized) redirect("/?error=invalid");

  const email = await resolveStudentEmailByPhone(normalized);
  if (!email) redirect("/?error=not_found");

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (error || !data?.properties?.hashed_token) redirect("/?error=not_found");

  const supabase = await createSupabaseServerClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: data.properties.hashed_token,
  });
  if (verifyError) redirect("/?error=not_found");

  const profile = await fetchProfile(supabase);
  redirect(ROLE_HOME[profile?.role ?? "student"]);
}
