import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UserRole = "admin" | "teacher" | "student";

export interface Profile {
  id: string;
  role: UserRole;
  instructor_id: string | null;
  student_id: string | null;
}

export const ROLE_HOME: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/egitmen",
  student: "/ogrenci",
};

export async function fetchProfile(
  supabase: SupabaseClient
): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, role, instructor_id, student_id")
    .eq("id", user.id)
    .maybeSingle();
  // Users created before roles existed have no profile row → treat as admin.
  return (data as Profile | null) ?? { id: user.id, role: "admin", instructor_id: null, student_id: null };
}

// Layout guard: requires a signed-in user with the given role; bounces
// signed-in users with another role to their own panel.
export async function requireRole(role: UserRole): Promise<Profile> {
  const loginPath = role === "admin" ? "/admin/giris" : "/giris";
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(loginPath);

  const profile = await fetchProfile(supabase);
  if (!profile) redirect(loginPath);
  if (profile.role !== role) redirect(ROLE_HOME[profile.role]);
  return profile;
}
