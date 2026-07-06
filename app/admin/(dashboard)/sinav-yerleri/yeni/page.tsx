import { BackLink } from "@/components/ui/back-link";
import { ExamPlaceForm } from "../exam-place-form";

export default function NewExamPlacePage() {
  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Sınav yerlerine dön" />
      <h1 className="text-2xl font-semibold">Yeni sınav yeri</h1>
      <ExamPlaceForm />
    </section>
  );
}
