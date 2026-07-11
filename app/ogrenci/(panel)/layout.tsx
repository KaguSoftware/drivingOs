import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PanelNav } from "@/components/ui/panel-nav";
import { PageContainer } from "@/components/ui/page-container";
import { CanceledClassBanner } from "./canceled-class-banner";

const NAV_ITEMS = [
  { href: "/ogrenci", label: "Özet" },
  { href: "/ogrenci/derslerim", label: "Derslerim" },
  { href: "/ogrenci/ders-al", label: "Ders al" },
  { href: "/ogrenci/ders-tercihleri", label: "Ders tercihleri" },
  { href: "/ogrenci/odemelerim", label: "Ödemeler" },
];

export default async function StudentPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PanelNav title="Öğrenci Paneli" items={NAV_ITEMS} email={user?.email} />
      <main className="flex-1 px-4 py-6 peer-data-[sidebar=true]:pl-16 sm:px-6 sm:py-8 sm:peer-data-[sidebar=true]:pl-6">
        <PageContainer>
          <CanceledClassBanner studentId={profile.student_id!} />
          {children}
        </PageContainer>
      </main>
    </div>
  );
}
