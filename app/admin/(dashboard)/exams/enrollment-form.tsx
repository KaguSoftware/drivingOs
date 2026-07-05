import { enrollStudent } from "./actions";
import type { Student } from "../students/student.model";

export function EnrollmentForm({
  examSessionId,
  availableStudents,
}: {
  examSessionId: string;
  availableStudents: Student[];
}) {
  if (availableStudents.length === 0) {
    return <p className="text-sm text-zinc-500">All students are already enrolled.</p>;
  }

  return (
    <form action={enrollStudent} className="flex max-w-md items-end gap-3">
      <input type="hidden" name="exam_session_id" value={examSessionId} />
      <label className="flex flex-1 flex-col gap-1 text-sm">
        Student
        <select
          name="student_id"
          required
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        >
          {availableStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        Enroll
      </button>
    </form>
  );
}
