/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable strict mode to reduce double renders
  
  // Disable ESLint and TypeScript checking during build process
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Completely disable the error overlay that causes stack frames issue
  // This will only affect development mode
  webpack: (config, { isServer, dev }) => {
    // Only apply this in development mode
    if (dev && !isServer) {
      // Disable the error overlay
      config.module.rules.push({
        test: /node_modules\/next\/dist\/client\/components\/react-dev-overlay\/internal\/container/,
        loader: 'null-loader',
      });
    }
    return config;
  },
  
  // No rewrites - use direct API calls with NEXT_PUBLIC_API_URL only
};

module.exports = nextConfig; 