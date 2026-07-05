import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { ExamPlace } from "./exam-place.model";
import { deleteExamPlace } from "./actions";

export function ExamPlaceTable({ places }: { places: ExamPlace[] }) {
  if (places.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No exam places yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Address</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
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
