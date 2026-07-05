import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { VehicleDamageRecord } from "../vehicle-damage-record.model";
import { deleteDamageRecord } from "../damage-record-actions";

export function DamageRecordTable({ records }: { records: VehicleDamageRecord[] }) {
  if (records.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No damage recorded.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Part</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Notes</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-3 font-medium">{record.partName}</td>
              <td className="px-4 py-3">{record.statusLabel()}</td>
              <td className="px-4 py-3">{record.notes}</td>
              <td className="px-4 py-3">
                <Link href={`/vehicles/${record.vehicleId}/damage-records/${record.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton
                  action={deleteDamageRecord.bind(null, record.id, record.vehicleId)}
                  confirmMessage="Delete this damage record?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
