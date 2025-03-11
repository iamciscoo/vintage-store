// Required for using next-auth in middleware
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from 'next-auth/jwt'

// Set runtime to nodejs explicitly for middleware
export const runtime = "nodejs"

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    const isAuth = !!token
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
    const isAdminUser = token?.role === 'ADMIN'

    // Redirect authenticated users away from auth pages
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Redirect unauthenticated users to login page
    if (!isAuth && isAdminPage) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Redirect non-admin users away from admin pages
    if (isAuth && !isAdminUser && isAdminPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // Log the error but continue to avoid blocking the application
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
} 