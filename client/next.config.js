import { API_REWRITE_PREFIX, API_SERVER_BASE_PATH } from "./common/constants";

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  rewrites: async () => [
    {
      source: `${API_REWRITE_PREFIX}:path*`,
      destination: `${API_SERVER_BASE_PATH}:path*`,
    },
  ],
};

module.exports = nextConfig;
