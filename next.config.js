/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "media0.giphy.com",
      "encrypted-tbn0.gstatic.com",
      "i.pinimg.com",
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
