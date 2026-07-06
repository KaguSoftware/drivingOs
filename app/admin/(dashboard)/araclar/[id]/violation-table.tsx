import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { VehicleViolation } from "../vehicle-violation.model";
import { deleteViolation } from "../violation-actions";

export function ViolationTable({ violations }: { violations: VehicleViolation[] }) {
  if (violations.length === 0) {
    return <p className={emptyStateClass}>Kayıtlı ceza yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Tür</th>
            <th className="px-4 py-3 font-medium">Tarih</th>
            <th className="px-4 py-3 font-medium">Ceza</th>
            <th className="px-4 py-3 font-medium">Açıklama</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {violations.map((violation) => (
            <tr key={violation.id}>
              <td className="px-4 py-3 font-medium">{violation.violationType}</td>
              <td className="px-4 py-3">{violation.violationDate().toLocaleDateString("tr-TR")}</td>
              <td className="px-4 py-3">{violation.fineAmount ?? "-"}</td>
              <td className="px-4 py-3">{violation.description}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/araclar/${violation.vehicleId}/ihlaller/${violation.id}/duzenle`}
                  deleteAction={deleteViolation.bind(null, violation.id, violation.vehicleId)}
                  deleteConfirmMessage="Bu ceza silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
