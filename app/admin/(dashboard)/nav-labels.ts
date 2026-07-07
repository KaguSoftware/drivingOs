import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";

// Shared by sidebar-nav.tsx (desktop) and mobile-nav.tsx.
// Keep in sync with lib/routes.ts and nav-icons.tsx.
export const NAV_LABELS: Record<(typeof DASHBOARD_PATH_PREFIXES)[number], string> = {
  "/admin/ogrenciler": "Öğrenciler",
  "/admin/araclar": "Araçlar",
  "/admin/hasarli-araclar": "Hasarlı Araçlar",
  "/admin/arac-periyodik-bakimlari": "Araç Periyodik Bakımları",
  "/admin/program": "Haftalık Program",
  "/admin/egitmenler": "Eğitmenler",
  "/admin/egitmen-takip": "Eğitmen Takibi",
  "/admin/odemeler": "Ödeme Takibi",
  "/admin/sinav-yerleri": "Sınav Yerleri",
  "/admin/sinavlar": "Sınavlar",
};
