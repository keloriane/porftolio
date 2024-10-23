/** @type {import('next').NextConfig} */

import path from "path";

const nextConfig = {
  images: {
    domains: ["images.pexels.com", "cdn.sanity.io"],
  },
  compiler: {
    styledComponents: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["glsl-shader-loader"], // Only use glsl-shader-loader
    });

    return config;
  },
};

export default nextConfig;
