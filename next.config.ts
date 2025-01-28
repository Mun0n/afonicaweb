import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['afonicanaranjo.com'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Exclude /shop from Next.js handling
  async headers() {
    return [
      {
        source: '/shop/:path*',
        headers: [
          {
            key: 'x-middleware-skip',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default config;
