"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";
import { NAV_ICONS } from "./nav-icons";
import { NAV_LABELS } from "./nav-labels";
import { logout } from "./actions";

// Top bar + slide-in drawer for the admin dashboard on small screens.
// The hover-expand sidebar handles lg+; this handles below lg.
export function MobileNav({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            DO
          </span>
          <span className="text-sm font-semibold">Driving School OS</span>
        </div>
        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="flex w-72 max-w-[80%] flex-col overflow-y-auto bg-sidebar p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Menü</span>
              <button aria-label="Kapat" onClick={() => setOpen(false)} className="rounded p-1 text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {DASHBOARD_PATH_PREFIXES.map((href) => {
                const Icon = NAV_ICONS[href];
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      active
                        ? "bg-sidebar-active font-medium text-primary-foreground"
                        : "text-sidebar-muted hover:bg-background"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {NAV_LABELS[href]}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-sidebar-border pt-4">
              {email && <p className="mb-2 truncate px-3 text-xs text-sidebar-muted">{email}</p>}
              <form action={logout}>
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-sidebar-muted hover:bg-background">
                  Çıkış yap
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
