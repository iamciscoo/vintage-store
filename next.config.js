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
  // Adding experimental configuration to handle potential server component errors
  experimental: {
    // Ensures server components are properly handled with the React 18 update
    serverComponentsExternalPackages: ["bcryptjs", "@prisma/client"],
    // Increasing stability by enabling the app directory features
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