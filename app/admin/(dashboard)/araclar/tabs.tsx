import Link from "next/link";

type VehicleSection = "vehicles" | "hasarli" | "bakim";

const TABS: { key: VehicleSection; href: string; label: string }[] = [
  { key: "vehicles", href: "/admin/araclar", label: "Araçlar" },
  { key: "hasarli", href: "/admin/araclar?tab=hasarli", label: "Hasarlı Araçlar" },
  { key: "bakim", href: "/admin/araclar?tab=bakim", label: "Araç Periyodik Bakımları" },
];

export function VehicleSectionTabs({ active }: { active: VehicleSection }) {
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
