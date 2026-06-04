/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mimpexbd.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "thf.bing.com", pathname: "/**" },
    ],
  },
  // Reduces "Cannot find module './XXX.js'" from stale webpack chunks on Windows dev
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" };
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 500,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
