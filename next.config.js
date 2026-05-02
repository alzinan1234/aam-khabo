/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 't4.ftcdn.net' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'organiconline.com.bd' },
      { protocol: 'https', hostname: 'www.shajgoj.com' },
        { protocol: 'https', hostname: 'www.daringgourmet.com' },
        { protocol: 'https', hostname: 'sapaharmango.com' },
    ],
  },
};

module.exports = nextConfig;