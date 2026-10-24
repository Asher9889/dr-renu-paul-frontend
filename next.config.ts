import type { NextConfig } from "next";

const configuredApiTarget =
  process.env.API_PROXY_TARGET ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4506";

const apiOrigin = configuredApiTarget.startsWith("/")
  ? "http://localhost:4506"
  : new URL(configuredApiTarget).origin;

const isLocalApiHost = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(
  new URL(apiOrigin).hostname,
);

const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL
  ? new URL(process.env.NEXT_PUBLIC_MEDIA_URL)
  : null;

const imageRemotePatterns = [
  new URL(apiOrigin),
  ...(mediaBaseUrl ? [mediaBaseUrl] : []),
].map((url) => ({
  protocol: url.protocol.replace(":", "") as "http" | "https",
  hostname: url.hostname,
  port: url.port,
  pathname: "/**",
}));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageRemotePatterns,
    ...(isLocalApiHost ? { dangerouslyAllowLocalIP: true } : {}),
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiOrigin}/api/v1/:path*`,
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
