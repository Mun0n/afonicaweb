import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for /shop, bypass Next.js
  if (pathname.startsWith('/shop')) {
    return NextResponse.rewrite(new URL(request.url));
  }

  // Handle Prestashop assets and routes under /shop
  if (pathname.startsWith('/shop')) {
    // Keep the original request headers
    const requestHeaders = new Headers(request.headers);
    
    // Add X-Forwarded headers
    requestHeaders.set('X-Forwarded-Host', request.headers.get('host') || '');
    requestHeaders.set('X-Forwarded-Proto', 'https');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shop/:path*'],
}; 