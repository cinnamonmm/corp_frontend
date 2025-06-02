import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', '127.0.0.1', '**.westerlund.co.jp', '**.strapiapp.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.westerlund.co.jp',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
