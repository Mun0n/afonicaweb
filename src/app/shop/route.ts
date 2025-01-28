import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const prestashopUrl = process.env.PRESTASHOP_URL || 'http://localhost:8080';
  const url = new URL(req.url);
  const targetUrl = `${prestashopUrl}${url.pathname.replace('/shop', '')}${url.search}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(prestashopUrl).host,
      },
    });

    const body = await response.blob();
    const headers = new Headers(response.headers);
    
    // Update any absolute URLs in headers
    headers.forEach((value, key) => {
      if (value.includes(prestashopUrl)) {
        headers.set(key, value.replace(prestashopUrl, `/shop`));
      }
    });

    return new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}

export async function PUT(req: NextRequest) {
  return GET(req);
}

export async function DELETE(req: NextRequest) {
  return GET(req);
}

export async function PATCH(req: NextRequest) {
  return GET(req);
} 