import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/shop')) {
    const url = new URL(request.url)
    const newUrl = new URL(`http://156.67.74.51${url.pathname}${url.search}`)
    return NextResponse.rewrite(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/shop/:path*',
} 