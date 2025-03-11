// Required for using next-auth in middleware
export const runtime = "nodejs";

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  try {
    const session = await auth()
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

    if (isAuthPage) {
      if (session) {
        return NextResponse.redirect(new URL("/", request.url))
      }
      return NextResponse.next()
    }

    if (!session) {
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, allow the request to continue to avoid blocking the application
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/profile/:path*",
  ],
} 