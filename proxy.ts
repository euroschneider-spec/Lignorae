import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/og-image") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/de") ||
    pathname.startsWith("/ro")
  ) {
    return NextResponse.next();
  }

  const languageCookie = request.cookies.get("lignorae-language")?.value;

  if (languageCookie === "de" || languageCookie === "ro" || languageCookie === "en") {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") || "";

  const url = request.nextUrl.clone();

  if (acceptLanguage.toLowerCase().startsWith("de")) {
    url.pathname = `/de${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("lignorae-language", "de", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  if (
    acceptLanguage.toLowerCase().startsWith("ro") ||
    acceptLanguage.toLowerCase().includes("ro-")
  ) {
    url.pathname = `/ro${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("lignorae-language", "ro", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set("lignorae-language", "en", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};