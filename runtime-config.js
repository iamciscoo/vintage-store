// This file is used to configure runtime settings for Next.js
module.exports = {
  // Specify that middleware should use the Node.js runtime
  middleware: {
    runtime: 'nodejs',
  },
  // Enable dynamic imports for Node.js modules
  unstable_allowDynamic: [
    '/node_modules/bcryptjs/**',
    '/node_modules/@prisma/client/**',
  ],
  // Specify server-only packages
  serverDependencies: ['bcryptjs', '@prisma/client'],
} 