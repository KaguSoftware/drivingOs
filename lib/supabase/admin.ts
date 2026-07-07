import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client for admin-only server code (account creation).
// Never import from client components; bypasses RLS entirely.
export function createSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set (.env.local)");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
