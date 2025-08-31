/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any hostname
        port: '',
        pathname: '/**', // allow any path
      },
    ],
  },
}

export default nextConfig
