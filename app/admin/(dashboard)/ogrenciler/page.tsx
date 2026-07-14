import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { StudentRepository } from "./student.repository";
import { PaymentInstallmentRepository } from "../odemeler/payment-installment.repository";
import { StudentTable } from "./student-table";
import { toStudentView } from "./student-view";

export default async function StudentsPage() {
  const supabase = await createSupabaseServerClient();
  const [students, balances] = await Promise.all([
    new StudentRepository(supabase).listAll(),
    new PaymentInstallmentRepository(supabase).outstandingBalances(),
  ]);

  const debtByStudent = new Map(balances.map((b) => [b.studentId, b.totalDebt]));
  const rows = students.map((s) => toStudentView(s, debtByStudent.get(s.id) ?? 0));
  const theoryComplete = students.filter((s) => s.isTheoryComplete()).length;
  const practiceComplete = students.filter((s) => s.isPracticeComplete()).length;
  const debtorCount = balances.filter((b) => b.totalDebt > 0).length;

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Öğrenciler"
        description={`${students.length} kayıtlı öğrenci`}
        actions={
          <Link href="/admin/ogrenciler/yeni" className={primaryLinkClass}>
            Yeni öğrenci
          </Link>
        }
      />
      <StatGrid>
        <StatCard label="Toplam öğrenci" value={students.length} />
        <StatCard label="Teorisi tamam" value={theoryComplete} />
        <StatCard label="Direksiyonu tamam" value={practiceComplete} />
        <StatCard label="Borçlu öğrenci" value={debtorCount} />
      </StatGrid>
      <StudentTable rows={rows} />
    </section>
  );
}
