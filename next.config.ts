import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for OpenNext Cloudflare
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
