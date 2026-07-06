import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SidebarNav } from "./sidebar-nav";
import { logout } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const initial = user.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="group/sidebar flex w-20 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar px-4 py-6 transition-[width] duration-200 ease-in-out hover:w-64">
        <Link href="/admin/students" className="mb-8 flex items-center gap-2.5 px-2">
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
              {user.email}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-sidebar-muted opacity-0 transition-opacity duration-200 hover:bg-background hover:text-sidebar-foreground group-hover/sidebar:opacity-100"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
