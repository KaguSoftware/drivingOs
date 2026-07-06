import type { UpcomingExam } from "./exam-lookup.model";

export type LookupState = "idle" | "invalid" | "not_found" | "no_upcoming" | "found";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export function ExamLookupResult({
  state,
  exams,
}: {
  state: LookupState;
  exams: UpcomingExam[];
}) {
  if (state === "idle") return null;

  if (state === "invalid") {
    return <p className="text-sm text-danger">TC Kimlik No 11 haneli olmalıdır.</p>;
  }

  if (state === "not_found") {
    return <p className="text-sm text-danger">Bu TC Kimlik No ile kayıtlı öğrenci bulunamadı.</p>;
  }

  if (state === "no_upcoming") {
    return <p className="text-sm text-muted">Yaklaşan bir sınavınız bulunmuyor.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {exams.map((exam, index) => (
        <div key={index} className="flex flex-col gap-2 rounded-md border border-border bg-surface p-4">
          <p className="text-sm text-muted">Merhaba {exam.studentFullName}</p>
          <h2 className="text-lg font-semibold">{exam.placeName}</h2>
          <p className="text-sm text-muted">{exam.placeAddress}</p>
          {exam.placeNotes && <p className="text-sm text-muted">{exam.placeNotes}</p>}
          <p className="text-sm font-medium">
            {dateFormatter.formatRange(exam.startsAt(), exam.endsAt())}
          </p>
          <iframe
            src={exam.mapsEmbedUrl()}
            className="h-64 w-full rounded-md border-0"
            loading="lazy"
            title={`${exam.placeName} konumu`}
          />
        </div>
      ))}
    </div>
  );
}
