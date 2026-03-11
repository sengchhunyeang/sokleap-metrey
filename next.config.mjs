/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---------------------------------------------------------------------------
  // Compression — gzip responses automatically (saves 60-80% transfer size)
  // ---------------------------------------------------------------------------
  compress: true,

  // ---------------------------------------------------------------------------
  // Power header — remove the X-Powered-By: Next.js header (minor security win)
  // ---------------------------------------------------------------------------
  poweredByHeader: false,

  // ---------------------------------------------------------------------------
  // React strict mode — catches side-effect bugs in development
  // ---------------------------------------------------------------------------
  reactStrictMode: true,

  // ---------------------------------------------------------------------------
  // Server-external packages — keep heavy server-only libs out of the edge/
  // client bundle.  These are only ever imported in API routes or server
  // components so they must never be bundled into client JS.
  // ---------------------------------------------------------------------------
  serverExternalPackages: ['@prisma/client', 'bcryptjs', 'xlsx', 'swagger-jsdoc', 'next-swagger-doc'],

  // ---------------------------------------------------------------------------
  // Image optimisation
  // ---------------------------------------------------------------------------
  images: {
    // The app uses <img> tags with local /logo/* paths.  Switching to
    // next/image later will benefit from these defaults.
    formats: ['image/avif', 'image/webp'],
    // Limit generated sizes to what the app actually needs
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ---------------------------------------------------------------------------
  // Headers — cache static assets aggressively, enable security headers
  // ---------------------------------------------------------------------------
  async headers() {
    return [
      {
        // Immutable static assets built by Next.js
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font files
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Logo images used in navbar and prescriptions
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Security headers for all routes
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ---------------------------------------------------------------------------
  // Logging — surface fetch cache usage during development
  // ---------------------------------------------------------------------------
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ---------------------------------------------------------------------------
  // Experimental — output file tracing for minimal production deploys
  // ---------------------------------------------------------------------------
  output: 'standalone',
};

// Bundle analyzer — only loaded when ANALYZE=true to avoid import errors in normal dev/build
let exported = nextConfig;
if (process.env.ANALYZE === 'true') {
  const { default: bundleAnalyzer } = await import('@next/bundle-analyzer');
  exported = bundleAnalyzer({ enabled: true })(nextConfig);
}

export default exported;
