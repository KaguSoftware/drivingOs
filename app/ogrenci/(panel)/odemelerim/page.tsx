import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { formatCurrency } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { BadgeTone } from "@/components/ui/badge";
import { PortalRepository } from "../portal.repository";

const STATUS_TONE: Record<string, BadgeTone> = {
  paid: "success",
  partial: "info",
  pending: "neutral",
  overdue: "danger",
};

export default async function StudentPaymentsPage() {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const installments = await new PortalRepository(supabase).listInstallments(profile.student_id!);

  const totalDebt = installments.reduce((s, i) => s + i.remainingDebt(), 0);
  const totalPaid = installments.reduce((s, i) => s + i.amountPaid, 0);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Ödemeler" description="Taksitleriniz ve kalan borcunuz." />
      <StatGrid>
        <StatCard label="Kalan borç" value={formatCurrency(totalDebt)} />
        <StatCard label="Ödenen" value={formatCurrency(totalPaid)} />
        <StatCard label="Taksit sayısı" value={installments.length} />
      </StatGrid>

      {installments.length === 0 ? (
        <EmptyState title="Taksit kaydınız yok" />
      ) : (
        <ul className="flex flex-col gap-2">
          {installments.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <div>
                <p className="font-medium">{formatCurrency(item.amount)}</p>
                <p className="text-xs text-muted">
                  Son ödeme: {item.dueDate().toLocaleDateString("tr-TR")}
                </p>
              </div>
              <div className="text-right">
                <Badge tone={item.isOverdue() ? "danger" : STATUS_TONE[item.status]}>
                  {item.isOverdue() ? "Gecikmiş" : item.statusLabel()}
                </Badge>
                {item.remainingDebt() > 0 && (
                  <p className="mt-1 text-xs text-muted">
                    Kalan: {formatCurrency(item.remainingDebt())}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
