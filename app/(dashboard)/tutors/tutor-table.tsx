import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { Instructor } from "./instructor.model";
import type { InstructorStats } from "./exam-result.repository";
import { deleteInstructor } from "./actions";

export function TutorTable({
  instructors,
  stats,
}: {
  instructors: Instructor[];
  stats: Map<string, InstructorStats>;
}) {
  if (instructors.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No tutors yet. Add the first one.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">License classes</th>
            <th className="px-4 py-3 font-medium">Pass rate</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {instructors.map((instructor) => {
            const instructorStats = stats.get(instructor.id);
            const passRate =
              !instructorStats || instructorStats.total === 0
                ? "No exams yet"
                : `${Math.round((instructorStats.passed / instructorStats.total) * 100)}% (${instructorStats.passed}/${instructorStats.total})`;

            return (
              <tr key={instructor.id}>
                <td className="px-4 py-3 font-medium">{instructor.fullName}</td>
                <td className="px-4 py-3">{instructor.phone}</td>
                <td className="px-4 py-3">{instructor.licenseClasses.join(", ")}</td>
                <td className="px-4 py-3">{passRate}</td>
                <td className="px-4 py-3">
                  <Link href={`/tutors/${instructor.id}/edit`} className="hover:underline">
                    Edit
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <DeleteButton
                    action={deleteInstructor.bind(null, instructor.id)}
                    confirmMessage="Delete this tutor?"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
