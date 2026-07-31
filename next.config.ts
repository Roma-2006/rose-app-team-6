// import { NextConfig } from 'next';
// import createNextIntlPlugin from 'next-intl/plugin';

// const nextConfig: NextConfig = {};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
