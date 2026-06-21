import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/pledges")
  
  // NextAuth stores session tokens in cookies. 
  // In production it might be __Secure-authjs.session-token
  const hasSessionCookie = req.cookies.has("authjs.session-token") || req.cookies.has("__Secure-authjs.session-token") || req.cookies.has("next-auth.session-token") || req.cookies.has("__Secure-next-auth.session-token")

  if (isProtectedRoute && !hasSessionCookie) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
