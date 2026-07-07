"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/giris/logout-action";

export interface PanelNavItem {
  href: string;
  label: string;
}

// Shared chrome for the teacher and student portals: a top bar (brand +
// logout) and a scrollable tab row that becomes a bottom bar on mobile.
export function PanelNav({
  title,
  items,
  email,
}: {
  title: string;
  items: PanelNavItem[];
  email?: string | null;
}) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            DO
          </span>
          <span className="text-sm font-semibold tracking-tight">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {email && <span className="hidden text-xs text-muted sm:inline">{email}</span>}
          <form action={logout}>
            <button className="rounded-lg px-3 py-1.5 text-sm text-muted hover:text-foreground">
              Çıkış
            </button>
          </form>
        </div>
      </header>

      <nav className="sticky bottom-0 z-30 order-last flex justify-around border-t border-border bg-surface px-2 py-1 sm:static sm:justify-start sm:gap-1 sm:border-t-0 sm:border-b sm:px-6 sm:py-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-center text-xs font-medium transition-colors sm:text-sm ${
                active ? "bg-info-soft text-primary" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
