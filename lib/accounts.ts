import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { UserRole } from "@/lib/roles";

const PASSWORD_ALPHABET = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generateTempPassword(length = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => PASSWORD_ALPHABET[b % PASSWORD_ALPHABET.length]).join("");
}

// Creates a login for a teacher/student and links it via profiles.
// Returns the temp password so the admin can hand it to the person once.
export async function createPortalAccount({
  email,
  role,
  linkId,
}: {
  email: string;
  role: Exclude<UserRole, "admin">;
  linkId: string;
}): Promise<string> {
  const admin = createSupabaseAdminClient();
  const password = generateTempPassword();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw new Error(`Hesap oluşturulamadı: ${error.message}`);

  const { error: profileError } = await admin.from("profiles").insert({
    id: data.user.id,
    role,
    instructor_id: role === "teacher" ? linkId : null,
    student_id: role === "student" ? linkId : null,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(data.user.id);
    throw new Error(`Hesap profili oluşturulamadı: ${profileError.message}`);
  }

  return password;
}
