"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";

export async function dismissCanceledClassNotice(requestId: string): Promise<void> {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("class_time_requests")
    .update({ notified_at: new Date().toISOString() })
    .eq("id", requestId)
    .eq("student_id", profile.student_id!);
  revalidatePath("/ogrenci", "layout");
}
