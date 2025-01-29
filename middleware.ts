import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')

  if (hostname === 'shop.afonicanaranjo.com') {
    const url = new URL(request.url)
    return NextResponse.redirect(`http://156.67.74.51${url.pathname}${url.search}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
} 