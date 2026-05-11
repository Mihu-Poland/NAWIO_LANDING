import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    browsersListForSwc: true,
  },
} as NextConfig;

export default nextConfig;
