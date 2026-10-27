import type { NextConfig } from "next";

// The browser only ever talks to this Next.js app. Requests to /api/* are
// proxied to the Express backend, so auth cookies are first-party on the
// frontend domain and no cross-site cookies or CORS are involved.
const backendUrl = (process.env.BACKEND_URL || "http://localhost:5000").replace(
  /\/+$/,
  "",
);

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
