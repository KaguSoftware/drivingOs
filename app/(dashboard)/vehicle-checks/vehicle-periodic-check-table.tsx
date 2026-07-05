import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { CheckStatus } from "./types";
import type { VehiclePeriodicCheck } from "./vehicle-periodic-check.model";
import { deletePeriodicCheck } from "./actions";

const STATUS_COLORS: Record<CheckStatus, string> = {
  ok: "text-emerald-600 dark:text-emerald-400",
  due_soon: "text-amber-600 dark:text-amber-400",
  overdue: "text-red-600 dark:text-red-400",
};

export function VehiclePeriodicCheckTable({ checks }: { checks: VehiclePeriodicCheck[] }) {
  if (checks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No periodic checks yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Vehicle</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Cost</th>
            <th className="px-4 py-3 font-medium">Provider</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
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
              <td className="px-4 py-3">
                <Link href={`/vehicle-checks/${check.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton action={deletePeriodicCheck.bind(null, check.id)} confirmMessage="Delete this check?" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
