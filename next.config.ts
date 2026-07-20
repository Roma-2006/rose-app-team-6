import nextPwa from 'next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();

const withPWA = nextPwa({
  dest: 'public',
  register: true,
});

export default withNextIntl(withPWA(nextConfig));
