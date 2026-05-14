import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './server/auth/jwt'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('rifi_auth_token')?.value

    if (!token || !verifyToken(token)) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
