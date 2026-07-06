import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isDashboardRoute = DASHBOARD_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const isLoginRoute = pathname === "/admin/giris";

  if (isDashboardRoute && !user) {
    return NextResponse.redirect(new URL("/admin/giris", request.url));
  }

  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin/ogrenciler", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
