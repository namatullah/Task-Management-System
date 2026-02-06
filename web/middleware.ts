import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Public paths
  const publicPaths = ["/signin", "/signup", "/"];
  const isPublicPath = publicPaths.includes(pathname);

  // If trying to access protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If logged in and trying to access auth pages
  if (isPublicPath && token && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
