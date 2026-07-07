import { enrollStudent } from "./actions";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Student } from "../ogrenciler/student.model";

export function EnrollmentForm({
  examSessionId,
  availableStudents,
}: {
  examSessionId: string;
  availableStudents: Student[];
}) {
  if (availableStudents.length === 0) {
    return <p className="text-sm text-muted">Tüm öğrenciler zaten kayıtlı.</p>;
  }

  return (
    <form action={enrollStudent} className="flex max-w-md items-end gap-3">
      <input type="hidden" name="exam_session_id" value={examSessionId} />
      <label className="flex flex-1 flex-col gap-1 text-sm">
        Öğrenci
        <select name="student_id" required className={inputClass}>
          {availableStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton>Kaydet</SubmitButton>
    </form>
  );
}
