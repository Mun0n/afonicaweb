import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Check if it's the shop subdomain
  if (hostname.startsWith('shop.')) {
    const targetUrl = `http://156.67.74.51/shop${pathname === '/' ? '' : pathname}${search}`
    return NextResponse.redirect(targetUrl)
  }

  return NextResponse.next()
}

// Match all paths except static files and api routes
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