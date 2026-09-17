import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Emits .next/standalone with its own minimal server and node_modules —
     the form we deploy to the Hostinger VPS behind nginx. */
  output: "standalone",
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
