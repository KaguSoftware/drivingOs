import Link from "next/link";
import { SidebarNav } from "./sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-zinc-200 p-6 dark:border-zinc-800">
        <Link href="/" className="mb-8 block text-lg font-bold">
          Driving School OS
        </Link>
        <SidebarNav />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
