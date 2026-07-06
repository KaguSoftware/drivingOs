import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { VehicleDamageRecord } from "../vehicle-damage-record.model";
import { deleteDamageRecord } from "../damage-record-actions";

export function DamageRecordTable({ records }: { records: VehicleDamageRecord[] }) {
  if (records.length === 0) {
    return <p className={emptyStateClass}>No damage recorded.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Part</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Notes</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-3 font-medium">{record.partName}</td>
              <td className="px-4 py-3">{record.statusLabel()}</td>
              <td className="px-4 py-3">{record.notes}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/vehicles/${record.vehicleId}/damage-records/${record.id}/edit`}
                  deleteAction={deleteDamageRecord.bind(null, record.id, record.vehicleId)}
                  deleteConfirmMessage="Delete this damage record?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
