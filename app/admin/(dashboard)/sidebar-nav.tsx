"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";
import { NAV_ICONS } from "./nav-icons";

const NAV_LABELS: Record<(typeof DASHBOARD_PATH_PREFIXES)[number], string> = {
  "/admin/students": "Students",
  "/admin/vehicles": "Damaged Vehicles",
  "/admin/vehicle-checks": "Vehicle Periodics",
  "/admin/schedule": "Weekly Schedule",
  "/admin/tutors": "Tutors",
  "/admin/payments": "Payment Control",
  "/admin/exam-places": "Exam Places",
  "/admin/exams": "Exams",
};

const NAV_ITEMS = DASHBOARD_PATH_PREFIXES.map((href) => ({
  href,
  label: NAV_LABELS[href],
  Icon: NAV_ICONS[href],
}));

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-sidebar-active font-medium text-primary-foreground"
                : "text-sidebar-muted hover:bg-background hover:text-sidebar-foreground"
            }`}
          >
            {isActive && (
              <span className="absolute -left-4 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
            <Icon
              className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                isActive ? "text-primary-foreground" : "text-sidebar-muted group-hover:text-sidebar-foreground"
              }`}
            />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
