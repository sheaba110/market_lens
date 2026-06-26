/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        hostname: 'www.sigma-computer.com', 
      },
      {
        protocol: 'https',
        hostname: 'alfrensia.com', 
      },
      {
        protocol: 'https',
        hostname: 'www.alfrensia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.elbadrgroupeg.store',
      },
      {
        protocol: 'https',
        hostname: 'www.hardwaremarket.net',
      },
    ],
  },
};

export default nextConfig;