"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";
import { NAV_ICONS } from "./nav-icons";
import { NAV_LABELS } from "./nav-labels";

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
            className={`group relative flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-sidebar-active font-medium text-primary-foreground"
                : "text-sidebar-muted hover:bg-background hover:text-sidebar-foreground"
            }`}
          >
            {isActive && (
              <span className="absolute -left-4 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                  isActive ? "text-primary-foreground" : "text-sidebar-muted group-hover:text-sidebar-foreground"
                }`}
              />
            </span>
            <span className="truncate whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
