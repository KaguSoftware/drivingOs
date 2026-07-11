import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { VehiclePeriodicCheck } from "../araclar/bakim/vehicle-periodic-check.model";

export function MaintenanceDatesTable({ checks }: { checks: VehiclePeriodicCheck[] }) {
  if (checks.length === 0) {
    return <p className={emptyStateClass}>Kayıtlı periyodik bakım yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Araç</th>
            <th className="px-4 py-3 font-medium">Tarih</th>
            <th className="px-4 py-3 font-medium">Maliyet</th>
            <th className="px-4 py-3 font-medium">Durum</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {checks.map((check) => (
            <tr key={check.id}>
              <td className="px-4 py-3 font-medium">
                {check.vehiclePlate} &middot; {check.vehicleMakeModel}
              </td>
              <td className="px-4 py-3">{check.dueDate().toLocaleDateString("tr-TR")}</td>
              <td className="px-4 py-3">{check.cost ? `₺${check.cost.toFixed(2)}` : "-"}</td>
              <td className="px-4 py-3">{check.statusLabel()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
