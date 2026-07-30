import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rose App',
    short_name: 'Rose',
    description: 'A Gifts online store',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/assets/icons/logo.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/icons/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
