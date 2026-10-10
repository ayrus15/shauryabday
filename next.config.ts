import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Memory/scrapbook photos are served as-is (local SVG placeholders and,
    // later, real photos) without the native image-optimization pipeline.
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack: (config, { dev }) => {
    // This environment is memory-constrained; webpack's persistent disk
    // cache can push the dev process into OOM crashes here.
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
