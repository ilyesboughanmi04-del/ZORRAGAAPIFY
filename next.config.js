/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CSS optimization
  optimizeFonts: true,
  // Ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  // Enable experimental features for better CSS handling
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
}

module.exports = nextConfig
