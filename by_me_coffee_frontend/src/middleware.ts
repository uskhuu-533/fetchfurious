import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export  function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = ["/sign-in", "/sign-up", "/favicon.ico", '/viewpage', '/payment'];
  const authPaths = ["/sign-in", "/sign-up", '/'];

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {    
    return NextResponse.next();
  }
  if (pathname.includes('/viewpage')){
    return NextResponse.next();
  }
  const token = req.cookies.get("auth_token")?.value;
  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!token && !publicPaths.includes(pathname)) {    
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
