import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { PROTECTED_PATH_PREFIXES, LOGIN_PATHS } from "@/lib/routes";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isLoginRoute = (LOGIN_PATHS as readonly string[]).includes(pathname);
  const isProtectedRoute =
    !isLoginRoute &&
    PROTECTED_PATH_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/giris", request.url));
  }

  // Role-aware landing happens in layouts; /admin bounces non-admins.
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
