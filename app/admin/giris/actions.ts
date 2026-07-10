"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchProfile } from "@/lib/roles";

// Admin-only entrance: email + password, no phone lookup. Rejects
// credentials that authenticate but don't belong to an admin profile.
export async function adminLogin(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect("/admin/giris?error=1");
  }

  const profile = await fetchProfile(supabase);
  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/giris?error=not_admin");
  }

  redirect("/admin");
}
