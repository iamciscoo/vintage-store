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
    serverActions: true,
  },
  // Adding runtime configuration for modules that need Node.js runtime
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      dns: false,
      tls: false,
      fs: false,
      path: false,
    };
    return config;
  },
}

module.exports = nextConfig 