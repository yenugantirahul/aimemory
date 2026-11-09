import { NextResponse, type NextRequest } from "next/server";

// better-auth adds the __Secure- prefix when the site is served over https.
const SESSION_COOKIES = ["better-auth.session_token", "__Secure-better-auth.session_token"];

// Optimistic check only: it looks for the cookie, not a valid session. The
// backend still authorizes every request, and an expired session is caught by
// the 401 handling in the API client.
export function proxy(request: NextRequest) {
  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (hasSession) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/chat/:path*"],
};
