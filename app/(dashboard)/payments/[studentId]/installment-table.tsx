import type { PaymentInstallment } from "../payment-installment.model";
import { RecordPaymentForm } from "./record-payment-form";

export function InstallmentTable({ installments }: { installments: PaymentInstallment[] }) {
  if (installments.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No installments for this student.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Paid</th>
            <th className="px-4 py-3 font-medium">Remaining</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Record payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {installments.map((installment) => (
            <tr key={installment.id}>
              <td className="px-4 py-3">{installment.dueDate().toLocaleDateString()}</td>
              <td className="px-4 py-3">{installment.amount.toFixed(2)}</td>
              <td className="px-4 py-3">{installment.amountPaid.toFixed(2)}</td>
              <td className="px-4 py-3">{installment.remainingDebt().toFixed(2)}</td>
              <td className="px-4 py-3">{installment.statusLabel()}</td>
              <td className="px-4 py-3">
                <RecordPaymentForm installmentId={installment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
