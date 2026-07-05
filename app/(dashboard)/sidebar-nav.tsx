"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/students", label: "Students" },
  { href: "/vehicles", label: "Damaged Vehicles" },
  { href: "/vehicle-checks", label: "Vehicle Periodics" },
  { href: "/schedule", label: "Weekly Schedule" },
  { href: "/tutors", label: "Tutors" },
  { href: "/payments", label: "Payment Control" },
  { href: "/exam-places", label: "Exam Places" },
  { href: "/exams", label: "Exams" },
];

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
                ? "rounded-md px-3 py-2 text-sm font-medium bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
