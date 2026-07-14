import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import { formatCurrency } from "@/lib/format";
import type { PaymentInstallment } from "../payment-installment.model";
import { RecordPaymentForm } from "./record-payment-form";
import { deleteInstallment } from "../actions";

export function InstallmentTable({ installments }: { installments: PaymentInstallment[] }) {
  if (installments.length === 0) {
    return <p className={emptyStateClass}>Henüz taksit yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Vade tarihi</th>
            <th className="px-4 py-3 font-medium">Tutar</th>
            <th className="px-4 py-3 font-medium">Ödenen</th>
            <th className="px-4 py-3 font-medium">Kalan</th>
            <th className="px-4 py-3 font-medium">Durum</th>
            <th className="px-4 py-3 font-medium">Ödeme kaydet</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {installments.map((installment) => (
            <tr key={installment.id}>
              <td className="px-4 py-3">{installment.dueDate().toLocaleDateString("tr-TR")}</td>
              <td className="px-4 py-3">{formatCurrency(installment.amount)}</td>
              <td className="px-4 py-3">{formatCurrency(installment.amountPaid)}</td>
              <td className="px-4 py-3">{formatCurrency(installment.remainingDebt())}</td>
              <td className="px-4 py-3">{installment.statusLabel()}</td>
              <td className="px-4 py-3">
                <RecordPaymentForm installmentId={installment.id} />
              </td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/odemeler/${installment.studentId}/${installment.id}/duzenle`}
                  deleteAction={deleteInstallment.bind(null, installment.id, installment.studentId)}
                  deleteConfirmMessage="Bu taksit silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
