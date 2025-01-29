import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get hostname (e.g. shop.afonicanaranjo.com)
  const hostname = request.headers.get('host') || ''

  // Check if it's the shop subdomain
  if (hostname.startsWith('shop.')) {
    const url = new URL(request.url)
    const newUrl = new URL(`http://156.67.74.51/shop${url.pathname}${url.search}`)
    return NextResponse.redirect(newUrl, { status: 307 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 