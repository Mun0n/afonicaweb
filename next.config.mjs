import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimisticClientCache: true,
    serverMinification: true
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
};

export default withBundleAnalyzer(config);
