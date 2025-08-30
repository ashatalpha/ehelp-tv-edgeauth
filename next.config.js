/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable static exports for better performance
  output: 'export',
  trailingSlash: true,
  
  // Image optimization settings
  images: {
    unoptimized: true // Required for static export
  },
  
  // Environment variables
  env: {
    SITE_NAME: 'ehelp.tv',
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
