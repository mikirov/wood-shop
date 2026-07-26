import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const COOKIE_NAME = "or_admin_session";

function pathnameHasLocale(pathname: string) {
  return locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    if (pathname === "/admin/login" || !pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!token || !secret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const headerLocale = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.slice(0, 2)
    .toLowerCase();
  const locale =
    headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|products/).*)"],
};
