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
  // Completely exclude /shop from Next.js
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/shop/:path*',
          destination: '/404',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default config;
