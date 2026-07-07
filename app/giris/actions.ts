"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchProfile, ROLE_HOME } from "@/lib/roles";

export async function login(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/giris?error=1");
  }

  const profile = await fetchProfile(supabase);
  redirect(ROLE_HOME[profile?.role ?? "admin"]);
}
