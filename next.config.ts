import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // hoặc giá trị bạn muốn, ví dụ: '5mb', '20mb'
    },
    serverComponentsHmrCache: false, // defaults to true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zyijkaxgpdmoyohcunlm.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://vehiql-waitlist-306.created.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
