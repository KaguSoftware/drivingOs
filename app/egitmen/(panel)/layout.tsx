import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PanelNav } from "@/components/ui/panel-nav";

const NAV_ITEMS = [
  { href: "/egitmen", label: "Özet" },
  { href: "/egitmen/derslerim", label: "Derslerim" },
  { href: "/egitmen/musaitlik", label: "Müsaitlik" },
];

export default async function TeacherPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PanelNav title="Eğitmen Paneli" items={NAV_ITEMS} email={user?.email} />
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
