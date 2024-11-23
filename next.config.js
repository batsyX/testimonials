/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["res.cloudinary.com",'lh3.googleusercontent.com'], 
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: 'http://192.168.153.197:3000',  // Your local IP address
            },
          ],
        },
      ]
    },
  };
  
  module.exports = nextConfig;
  