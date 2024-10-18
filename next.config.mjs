/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "cdn.sanity.io"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
