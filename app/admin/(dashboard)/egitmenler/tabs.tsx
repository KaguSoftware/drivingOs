import Link from "next/link";

export function TeacherSectionTabs({ active }: { active: "list" | "takip" }) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-1 text-sm">
      <Link
        href="/admin/egitmenler"
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          active === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        Eğitmenler
      </Link>
      <Link
        href="/admin/egitmenler?tab=takip"
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          active === "takip"
            ? "bg-primary text-primary-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        Eğitmen Takibi
      </Link>
    </div>
  );
}
