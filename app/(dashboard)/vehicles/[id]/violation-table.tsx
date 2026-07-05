import type { VehicleViolation } from "../vehicle-violation.model";

export function ViolationTable({ violations }: { violations: VehicleViolation[] }) {
  if (violations.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No violations recorded.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Fine</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {violations.map((violation) => (
            <tr key={violation.id}>
              <td className="px-4 py-3 font-medium">{violation.violationType}</td>
              <td className="px-4 py-3">{violation.violationDate().toLocaleDateString()}</td>
              <td className="px-4 py-3">{violation.fineAmount ?? "-"}</td>
              <td className="px-4 py-3">{violation.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
