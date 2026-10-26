import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Complete generateMetadata's published-post lookup before any loading UI
  // commits HTTP 200; missing articles must retain their HTTP 404 status.
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/services/seo-marketing', destination: '/services/seo', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Exact public B2/CDN origins used by this app's blog asset records.
      ...(process.env.BLOG_MEDIA_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean).map(value => {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Invalid blog media configuration.');
        return { protocol: 'https' as const, hostname: url.hostname, port: url.port, pathname: '/**' };
      }),
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
      {
        protocol: 'https',
        hostname: 'blogpost001.s3.eu-central-003.backblazeb2.com',
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
