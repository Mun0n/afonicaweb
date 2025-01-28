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
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/shop/:path*',
          destination: 'https://156.67.74.51/shop/:path*',
          has: [
            {
              type: 'header',
              key: 'x-skip-next',
              value: '(?!true)',
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/shop/:path*',
        headers: [
          {
            key: 'x-skip-next',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default config;
