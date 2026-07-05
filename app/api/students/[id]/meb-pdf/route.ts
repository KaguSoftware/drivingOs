import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "@/app/(dashboard)/students/student.repository";
import { buildMebPdf } from "@/app/(dashboard)/students/meb-pdf";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const student = await new StudentRepository(supabase).findById(id);
  const pdf = await buildMebPdf(student);

  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="meb-${id}.pdf"`,
    },
  });
}
