import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!||_next/static|_next/image|favicon.ico|login|signup).*)",
    '/dashboard',
    '/course/create-course',
    '/course/get-courses'
  ],
};

export default withAuth((req) => {
  const cookie = cookies();
  const next_auth_session_token = cookie.get("next-auth.session-token");
  if (next_auth_session_token && next_auth_session_token.value) {
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});
