import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl;

  // autoriser GET /api/flights sans authentification
  if (url.pathname.startsWith("/api/flights") && request.method === "GET") {
    return NextResponse.next();
  }

  // Toutes les autres routes /api nécessitent un token
  if (!token) {
    url.pathname = "/api/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
