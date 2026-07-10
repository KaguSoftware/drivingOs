import Link from "next/link";

type ExamSection = "sessions" | "places";

const TABS: { key: ExamSection; href: string; label: string }[] = [
  { key: "sessions", href: "/admin/sinavlar", label: "Sınavlar" },
  { key: "places", href: "/admin/sinavlar?tab=places", label: "Sınav Yerleri" },
];

export function ExamSectionTabs({ active }: { active: ExamSection }) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-1 text-sm">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            tab.key === active
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
