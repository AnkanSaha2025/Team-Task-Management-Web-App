import type { NextConfig } from "next";
import { API_URL } from "./config/global";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  allowedDevOrigins: [API_URL],
  poweredByHeader: false
};

export default nextConfig;
