import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
