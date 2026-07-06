import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Student } from "./student.model";
import { deleteStudent } from "./actions";

export function StudentTable({ students }: { students: Student[] }) {
  if (students.length === 0) {
    return <p className={emptyStateClass}>No students yet. Add the first one.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Class</th>
            <th className="px-4 py-3 font-medium">Theory</th>
            <th className="px-4 py-3 font-medium">Practice</th>
            <th className="px-4 py-3 font-medium">MEB</th>
            <th className="px-4 py-3 font-medium">MEB PDF</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-3 font-medium">{student.fullName}</td>
              <td className="px-4 py-3">{student.phone}</td>
              <td className="px-4 py-3">{student.licenseClass}</td>
              <td className="px-4 py-3">{student.theoryLabel()}</td>
              <td className="px-4 py-3">{student.practiceLabel()}</td>
              <td className="px-4 py-3">{student.mebLabel()}</td>
              <td className="px-4 py-3">
                <a href={`/api/students/${student.id}/meb-pdf`} className="hover:underline">
                  Download PDF
                </a>
              </td>
              <td className="px-4 py-3">
                <Link href={`/admin/students/${student.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton action={deleteStudent.bind(null, student.id)} confirmMessage="Delete this student?" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
