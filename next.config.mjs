import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COUNTRY_CODE: process.env.COUNTRY_CODE,
    TENANT_ID: process.env.TENANT_ID,
    API_URL: process.env.API_URL,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mui.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/account-management',
        destination: '/account-management/profile',
        permanent: true,
      },
    ];
  },
  transpilePackages: ['mui-one-time-password-input'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX();

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
