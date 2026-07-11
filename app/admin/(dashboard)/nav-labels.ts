import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";

// Shared by sidebar-nav.tsx (desktop) and mobile-nav.tsx.
// Keep in sync with lib/routes.ts and nav-icons.tsx.
export const NAV_LABELS: Record<(typeof DASHBOARD_PATH_PREFIXES)[number], string> = {
  "/admin/ogrenciler": "Öğrenciler",
  "/admin/araclar": "Araçlar",
  "/admin/program": "Haftalık Program",
  "/admin/egitmenler": "Eğitmenler",
  "/admin/odemeler": "Finansal Takip",
  "/admin/sinavlar": "Sınavlar",
};
