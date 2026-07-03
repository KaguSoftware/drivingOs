import { StudentForm } from "../student-form";

export default function NewStudentPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Register student</h1>
      <StudentForm />
    </section>
  );
}
