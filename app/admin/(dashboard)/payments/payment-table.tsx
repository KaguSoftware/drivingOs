import Link from "next/link";
import type { StudentBalance } from "./payment-installment.repository";

export function PaymentTable({ balances }: { balances: StudentBalance[] }) {
  if (balances.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No installments yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Remaining debt</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
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
