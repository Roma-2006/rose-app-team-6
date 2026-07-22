
import nextPwa from 'next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

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
const withPWA = nextPwa({
  dest: 'public',
  register: true,
});
