import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { CheckStatus } from "./types";
import type { VehiclePeriodicCheck } from "./vehicle-periodic-check.model";
import { deletePeriodicCheck } from "./actions";

const STATUS_COLORS: Record<CheckStatus, string> = {
  ok: "text-emerald-600",
  due_soon: "text-amber-600",
  overdue: "text-danger",
};

export function VehiclePeriodicCheckTable({ checks }: { checks: VehiclePeriodicCheck[] }) {
  if (checks.length === 0) {
    return <p className={emptyStateClass}>Henüz periyodik kontrol yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Araç</th>
            <th className="px-4 py-3 font-medium">Tür</th>
            <th className="px-4 py-3 font-medium">Vade tarihi</th>
            <th className="px-4 py-3 font-medium">Durum</th>
            <th className="px-4 py-3 font-medium">Ücret</th>
            <th className="px-4 py-3 font-medium">Sağlayıcı</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {checks.map((check) => (
            <tr key={check.id}>
              <td className="px-4 py-3 font-medium">
                {check.vehiclePlate} &middot; {check.vehicleMakeModel}
              </td>
              <td className="px-4 py-3">{check.checkTypeLabel()}</td>
              <td className="px-4 py-3">{check.dueDate().toLocaleDateString()}</td>
              <td className={`px-4 py-3 font-medium ${STATUS_COLORS[check.status()]}`}>
                {check.statusLabel()}
              </td>
              <td className="px-4 py-3">{check.cost ?? "-"}</td>
              <td className="px-4 py-3">{check.provider ?? "-"}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/vehicle-checks/${check.id}/edit`}
                  deleteAction={deletePeriodicCheck.bind(null, check.id)}
                  deleteConfirmMessage="Bu kontrol silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
