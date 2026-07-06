import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { PaymentInstallment } from "../payment-installment.model";
import { RecordPaymentForm } from "./record-payment-form";
import { deleteInstallment } from "../actions";

export function InstallmentTable({ installments }: { installments: PaymentInstallment[] }) {
  if (installments.length === 0) {
    return <p className={emptyStateClass}>No installments for this student.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Paid</th>
            <th className="px-4 py-3 font-medium">Remaining</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Record payment</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
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
              <td className="px-4 py-3">
                <Link
                  href={`/admin/payments/${installment.studentId}/${installment.id}/edit`}
                  className="hover:underline"
                >
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton
                  action={deleteInstallment.bind(null, installment.id, installment.studentId)}
                  confirmMessage="Delete this installment?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
