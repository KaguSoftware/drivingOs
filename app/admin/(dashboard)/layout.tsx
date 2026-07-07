import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { SidebarNav } from "./sidebar-nav";
import { MobileNav } from "./mobile-nav";
import { logout } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <MobileNav email={user?.email} />
      <aside className="group/sidebar hidden w-20 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar px-4 py-6 transition-[width] duration-200 ease-in-out hover:w-64 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            DO
          </span>
          <span className="whitespace-nowrap text-base font-semibold tracking-tight text-sidebar-foreground opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
            Driving School OS
          </span>
        </Link>
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-3 border-t border-sidebar-border pt-4">
          <div className="flex items-center gap-2.5 px-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-active text-xs font-semibold text-primary-foreground">
              {initial}
            </span>
            <p className="truncate whitespace-nowrap text-xs text-sidebar-muted opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
              {user?.email}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-sidebar-muted opacity-0 transition-opacity duration-200 hover:bg-background hover:text-sidebar-foreground group-hover/sidebar:opacity-100"
            >
              Çıkış yap
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
