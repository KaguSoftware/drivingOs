import Link from "next/link";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { StudentBalance } from "./payment-installment.repository";

export function PaymentTable({ balances }: { balances: StudentBalance[] }) {
  if (balances.length === 0) {
    return <p className={emptyStateClass}>Henüz taksit yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Öğrenci</th>
            <th className="px-4 py-3 font-medium">Kalan borç</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {balances.map((balance) => (
            <tr key={balance.studentId}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/payments/${balance.studentId}`} className="hover:underline">
                  {balance.studentName}
                </Link>
              </td>
              <td className="px-4 py-3">{balance.totalDebt.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
