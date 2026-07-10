import type { UpcomingExam } from "./upcoming-exam.model";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export function DashboardWelcome({
  studentFullName,
  exam,
}: {
  studentFullName: string;
  exam: UpcomingExam | null;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">Hoş geldin</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">{studentFullName}</h1>
        {exam && <p className="text-sm text-muted">{exam.placeName}</p>}
      </div>

      <div>
        <p className="text-xs text-muted">Sınav Tarihi</p>
        {exam ? (
          <p className="text-lg font-medium">{dateFormatter.formatRange(exam.startsAt(), exam.endsAt())}</p>
        ) : (
          <p className="text-sm font-medium">Yaklaşan bir sınavınız bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}
