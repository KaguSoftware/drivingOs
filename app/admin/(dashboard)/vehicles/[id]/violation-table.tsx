import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { VehicleViolation } from "../vehicle-violation.model";
import { deleteViolation } from "../violation-actions";

export function ViolationTable({ violations }: { violations: VehicleViolation[] }) {
  if (violations.length === 0) {
    return <p className={emptyStateClass}>No violations recorded.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Fine</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {violations.map((violation) => (
            <tr key={violation.id}>
              <td className="px-4 py-3 font-medium">{violation.violationType}</td>
              <td className="px-4 py-3">{violation.violationDate().toLocaleDateString()}</td>
              <td className="px-4 py-3">{violation.fineAmount ?? "-"}</td>
              <td className="px-4 py-3">{violation.description}</td>
              <td className="px-4 py-3">
                <Link href={`/admin/vehicles/${violation.vehicleId}/violations/${violation.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton
                  action={deleteViolation.bind(null, violation.id, violation.vehicleId)}
                  confirmMessage="Delete this violation?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
