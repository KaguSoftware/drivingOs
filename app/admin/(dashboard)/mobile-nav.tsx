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
      <header className="sticky top-0 z-60 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            DO
          </span>
          <span className="text-sm font-semibold">Driving School OS</span>
        </div>
        <button
          type="button"
          aria-label={open ? "Kapat" : "Menü"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-background hover:text-foreground"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ease-out ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-150 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ease-out ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full rotate-0"
              }`}
            />
          </span>
        </button>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex w-full flex-col overflow-y-auto bg-sidebar p-4 transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="mb-4 flex h-9 items-center">
          <span className="text-sm font-semibold">Menü</span>
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
  );
}
