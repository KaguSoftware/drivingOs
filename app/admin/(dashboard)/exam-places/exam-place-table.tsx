import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { ExamPlace } from "./exam-place.model";
import { deleteExamPlace } from "./actions";

export function ExamPlaceTable({ places }: { places: ExamPlace[] }) {
  if (places.length === 0) {
    return <p className={emptyStateClass}>No exam places yet.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Address</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {places.map((place) => (
            <tr key={place.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/exam-places/${place.id}`} className="hover:underline">
                  {place.name}
                </Link>
              </td>
              <td className="px-4 py-3">{place.address}</td>
              <td className="px-4 py-3">
                <Link href={`/admin/exam-places/${place.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton action={deleteExamPlace.bind(null, place.id)} confirmMessage="Delete this exam place?" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
