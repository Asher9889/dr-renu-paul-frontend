import type { NextConfig } from "next";

const apiProxyTarget = process.env.API_PROXY_TARGET ?? process.env.NEXT_PUBLIC_API_URL!;

const apiOrigin = new URL(apiProxyTarget).origin;

const isLocalApiHost = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(
  new URL(apiOrigin).hostname,
);
 
const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL
  ? new URL(process.env.NEXT_PUBLIC_MEDIA_URL)
  : null;

// Google serves profile pictures from regional hosts such as
// lh3.googleusercontent.com.
const googleAvatarPattern = {
  protocol: "https" as const,
  hostname: "*.googleusercontent.com",
  port: "",
  pathname: "/**",
};

const imageRemotePatterns = [ new URL(apiOrigin), ...(mediaBaseUrl ? [mediaBaseUrl] : [])].map((url) => ({
  protocol: url.protocol.replace(":", "") as "http" | "https",
  hostname: url.hostname,
  port: url.port,
  pathname: "/**",
}));

imageRemotePatterns.push(googleAvatarPattern);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageRemotePatterns,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiOrigin}/api/v1/:path*`,
      },
      {
        // Google OAuth callback registered before authentication moved to the
        // API. Hand it to the backend so existing Google credentials keep working.
        source: "/api/auth/callback/google",
        destination: `${apiOrigin}/api/v1/auth/google/callback`,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        condition: { not: { path: "*.module.css" } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
