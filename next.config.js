/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 'maxage=0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
