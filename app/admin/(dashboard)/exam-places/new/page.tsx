import { ExamPlaceForm } from "../exam-place-form";

export default function NewExamPlacePage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">New exam place</h1>
      <ExamPlaceForm />
    </section>
  );
}
