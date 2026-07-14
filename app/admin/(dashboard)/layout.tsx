import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageContainer } from "@/components/ui/page-container";
import { BrandMark } from "@/components/ui/brand-mark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
        <Link href="/admin" className="mb-8 px-2">
          <BrandMark />
        </Link>
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-4">
          <ThemeToggle />
          <form action={logout}>
            <button
              type="submit"
              aria-label="Çıkış yap"
              title="Çıkış yap"
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm text-sidebar-muted transition-colors hover:bg-surface-strong hover:text-sidebar-foreground"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
              </span>
              <span>Çıkış yap</span>
            </button>
          </form>
          <div className="mt-1 flex items-center gap-2.5 px-2 py-1.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-active text-xs font-semibold text-primary-foreground">
              {initial}
            </span>
            <p className="truncate text-xs text-sidebar-muted">{user?.email}</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
