/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.iplt20.com', 'assets.iplt20.com'],
  },
}

module.exports = nextConfig 