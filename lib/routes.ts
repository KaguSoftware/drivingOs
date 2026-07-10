// Keep in sync with app/admin/(dashboard)/sidebar-nav.tsx NAV_ITEMS and proxy.ts.
export const DASHBOARD_PATH_PREFIXES = [
  "/admin/ogrenciler",
  "/admin/araclar",
  "/admin/program",
  "/admin/egitmenler",
  "/admin/odemeler",
  "/admin/sinavlar",
] as const;

// Everything under these prefixes requires a signed-in user; role checks
// happen in each area's layout (proxy stays role-agnostic by design).
export const PROTECTED_PATH_PREFIXES = ["/admin", "/egitmen", "/ogrenci"] as const;

export const LOGIN_PATHS = ["/giris", "/admin/giris"] as const;
