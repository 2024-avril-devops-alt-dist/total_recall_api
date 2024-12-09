import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl;

  // Si l'utilisateur n'est pas connecté et tente d'accéder à /api (sauf endpoints publics), on le redirige vers /auth/login
  if (url.pathname.startsWith("/api") && !token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Protéger la page /docs (Swagger) : doit être ADMIN
  if (url.pathname.startsWith("/docs")) {
    if (!token) {
      // non connecté, redirige vers login
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    // Vérifier le rôle
    const role = token.role;
    if (role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admins only" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/docs"],
};
