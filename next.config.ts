import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/services/seo-marketing', destination: '/services/seo', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Performance optimizations
  reactStrictMode: true,
  // output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
