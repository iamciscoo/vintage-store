/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // We'll handle ESLint errors ourselves. This is temporary until Next.js 15 types are fixed.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // We'll handle TypeScript errors ourselves. This is temporary until Next.js 15 types are fixed.
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    nodeMiddleware: true,
  },
  // Configure webpack for Node.js compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        path: false,
      }
    }
    return config
  },
  // Specify which packages should be treated as external on the server
  serverComponentsExternalPackages: ['bcryptjs', '@prisma/client'],
}

module.exports = nextConfig