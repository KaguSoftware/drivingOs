import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import { formatCurrency } from "@/lib/format";
import type { VehicleDamageRecord } from "../araclar/vehicle-damage-record.model";

export function DamageCostTable({ records }: { records: VehicleDamageRecord[] }) {
  if (records.length === 0) {
    return <p className={emptyStateClass}>Kayıtlı hasar yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Parça</th>
            <th className="px-4 py-3 font-medium">Durum</th>
            <th className="px-4 py-3 font-medium">Maliyet</th>
            <th className="px-4 py-3 font-medium">Tarih</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-3 font-medium">{record.partName}</td>
              <td className="px-4 py-3">{record.statusLabel()}</td>
              <td className="px-4 py-3">{record.cost ? formatCurrency(record.cost) : "-"}</td>
              <td className="px-4 py-3">{record.createdAt().toLocaleDateString("tr-TR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
