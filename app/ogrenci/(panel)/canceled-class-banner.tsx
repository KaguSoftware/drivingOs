import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { dismissCanceledClassNotice } from "./dismiss-canceled-class-action";

// Shown when an admin cancels an auto-matched lesson: the student's request
// falls back to 'pending' and this banner nudges them to re-select a slot.
export async function CanceledClassBanner({ studentId }: { studentId: string }) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("class_time_requests")
    .select("id")
    .eq("student_id", studentId)
    .eq("was_ever_matched", true)
    .eq("status", "pending")
    .is("lesson_id", null)
    .is("notified_at", null)
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  const requestId = data.id as string;
  const dismiss = dismissCanceledClassNotice.bind(null, requestId);

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning">
      <p>
        Bir dersiniz iptal edildi, lütfen tekrar seçim yapın.{" "}
        <Link href="/ogrenci/ders-tercihleri" className="font-medium underline">
          Ders tercihlerine git
        </Link>
      </p>
      <form action={dismiss}>
        <button type="submit" className="shrink-0 text-xs text-warning/80 hover:text-warning">
          Kapat
        </button>
      </form>
    </div>
  );
}
