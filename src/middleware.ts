import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { pageview } from './lib/gtag';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  if (process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.pathname;
    pageview(url);
  }

  return NextResponse.next();
}

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
}; 