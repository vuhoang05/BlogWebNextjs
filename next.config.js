/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: ["images.pexels.com", "th.bing.com"]
  //     }
  //   ]
  // }
  images: {
    domains: ['images.pexels.com', 'th.bing.com', 'storage.lxmanga.com', "us.rule34.xxx"],
  },
}

module.exports = nextConfig
