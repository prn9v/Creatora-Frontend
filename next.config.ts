import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
