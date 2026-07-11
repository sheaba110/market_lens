/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'sigma-computer.com', 
      },
      {
        protocol: 'https',
        hostname: 'alfrensia.com', 
      },
      {
        protocol: 'https',
        hostname: 'alfrensia.com',
      },
      {
        protocol: 'https',
        hostname: 'elbadrgroupeg.store',
      },
      {
        protocol: 'https',
        hostname: 'hardwaremarket.net',
      },
    ],
  },
};

export default nextConfig;  