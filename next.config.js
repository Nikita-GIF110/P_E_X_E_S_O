const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/scss')],
  },
  images: {
    domains: ['rickandmortyapi.com'],
  },
}

module.exports = nextConfig
