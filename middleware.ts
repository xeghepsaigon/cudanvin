import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes
const protectedRoutes = ['/chu-xe', '/admin']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route needs protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for auth token in cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // Redirect to login
      const loginUrl = new URL('/dang-nhap', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // TODO: Verify token with Firebase
    // For now, we just check if it exists
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/chu-xe/:path*', '/admin/:path*']
}
