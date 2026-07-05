"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";

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
}));

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-md px-3 py-2 text-sm font-medium bg-blue-50 text-blue-900 dark:bg-blue-700/10 dark:text-blue-200"
                : "rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
