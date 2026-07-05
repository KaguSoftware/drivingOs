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

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-zinc-950/40">
        <Link href="/admin/students" className="mb-8 block text-lg font-bold tracking-tight text-blue-900 dark:text-blue-300">
          Driving School OS
        </Link>
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <p className="truncate text-xs text-zinc-500">{user.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
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
