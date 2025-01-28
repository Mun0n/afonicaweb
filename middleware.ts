import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/shop/')) {
    return NextResponse.rewrite(new URL(request.url.replace('https://afonicanaranjo.com', '')))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/shop/:path*',
} 