import { BackLink } from "@/components/ui/back-link";
import { StudentForm } from "../student-form";

export default function NewStudentPage() {
  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Öğrencilere dön" />
      <h1 className="text-2xl font-semibold">Öğrenci kaydet</h1>
      <StudentForm />
    </section>
  );
}
