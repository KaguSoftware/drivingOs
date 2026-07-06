import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { StudentBalance } from "./payment-installment.repository";
import type { PaymentInstallment } from "./payment-installment.model";
import { ExpandableBalanceRow } from "./expandable-balance-row";
import { InstallmentTable } from "./[studentId]/installment-table";

export function PaymentTable({
  balances,
  installmentsByStudent,
}: {
  balances: StudentBalance[];
  installmentsByStudent: Map<string, PaymentInstallment[]>;
}) {
  if (balances.length === 0) {
    return <p className={emptyStateClass}>Henüz taksit yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Remaining debt</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {balances.map((balance) => (
            <ExpandableBalanceRow
              key={balance.studentId}
              trigger={
                <>
                  <td className="px-4 py-3 font-medium">{balance.studentName}</td>
                  <td className="px-4 py-3">{balance.totalDebt.toFixed(2)}</td>
                </>
              }
            >
              <InstallmentTable installments={installmentsByStudent.get(balance.studentId) ?? []} />
            </ExpandableBalanceRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
