import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afonicanaranjo.com'
      },
      {
        protocol: 'https',
        hostname: 'www.afonicanaranjo.com'
      },
      {
        protocol: 'https',
        hostname: 'shop.afonicanaranjo.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.afonicanaranjo.com'
      }
    ]
  },
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_PRESTASHOP_URL) {
      return [];
    }
    return [
      {
        source: '/api/prestashop/:path*',
        destination: `${process.env.NEXT_PUBLIC_PRESTASHOP_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    optimizeCss: true,
    scrollRestoration: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer(config);
