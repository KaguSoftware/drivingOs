import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FinanceStats } from "./finance-stats";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import { PaymentTransactionRepository } from "./payment-transaction.repository";
import { ExpenseRepository } from "./expense.repository";
import { VehicleDamageRecordRepository } from "../araclar/vehicle-damage-record.repository";
import { VehiclePeriodicCheckRepository } from "../araclar/bakim/vehicle-periodic-check.repository";
import { InstructorRepository } from "../egitmenler/instructor.repository";
import { buildMonthKeys, buildIncomeSeries, monthLabel } from "./financial-summary";
import { buildExpenseSeries } from "./financial-expenses";
import { PaymentTable } from "./payment-table";
import { IncomeExpenseChart, type IncomeExpensePoint } from "./income-expense-chart";
import { DamageCostTable } from "./damage-cost-table";
import { MaintenanceDatesTable } from "./maintenance-dates-table";
import { WageSummary } from "./wage-summary";
import { RecentExpensesTable } from "./recent-expenses-table";
import { ExpenseDialog } from "./expense-dialog";
import type { PaymentInstallment } from "./payment-installment.model";

function groupByStudent(installments: PaymentInstallment[]): Map<string, PaymentInstallment[]> {
  const grouped = new Map<string, PaymentInstallment[]>();

  for (const installment of installments) {
    const existing = grouped.get(installment.studentId) ?? [];
    existing.push(installment);
    grouped.set(installment.studentId, existing);
  }

  return grouped;
}

export default async function FinancialTakipPage() {
  const supabase = await createSupabaseServerClient();
  const [
    balances,
    installments,
    transactions,
    expenses,
    damageRecords,
    maintenanceChecks,
    instructors,
  ] = await Promise.all([
    new PaymentInstallmentRepository(supabase).outstandingBalances(),
    new PaymentInstallmentRepository(supabase).listAll(),
    new PaymentTransactionRepository(supabase).listAll(),
    new ExpenseRepository(supabase).listAll(),
    new VehicleDamageRecordRepository(supabase).listAll(),
    new VehiclePeriodicCheckRepository(supabase).listByType("periyodik_bakim"),
    new InstructorRepository(supabase).listAll(),
  ]);

  const monthKeys = buildMonthKeys();
  const income = buildIncomeSeries(transactions, monthKeys);
  const expense = buildExpenseSeries({ damageRecords, maintenanceChecks, instructors, expenses }, monthKeys);
  const chartData: IncomeExpensePoint[] = monthKeys.map((key) => ({
    month: monthLabel(key),
    income: income[key],
    expense: expense[key],
  }));

  const totalOutstandingDebt = balances.reduce((sum, balance) => sum + balance.totalDebt, 0);

  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        title="Finansal Takip"
        actions={
          <>
            <Link href="/admin/odemeler/yeni" className={primaryLinkClass}>
              Yeni taksit
            </Link>
            <ExpenseDialog />
          </>
        }
      />

      <FinanceStats
        income={income}
        expense={expense}
        monthKeys={monthKeys}
        totalOutstandingDebt={totalOutstandingDebt}
        studentCount={balances.length}
      />

      <IncomeExpenseChart data={chartData} />

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Öğrenci borç ve ödemeleri</h2>
        <PaymentTable balances={balances} installmentsByStudent={groupByStudent(installments)} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Hasarlı araçlar ve onarım maliyetleri</h2>
        <DamageCostTable records={damageRecords} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Araç periyodik bakımları</h2>
        <MaintenanceDatesTable checks={maintenanceChecks} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Eğitmen ücretleri</h2>
        <WageSummary instructors={instructors} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Diğer giderler</h2>
        <RecentExpensesTable expenses={expenses} />
      </div>
    </section>
  );
}
