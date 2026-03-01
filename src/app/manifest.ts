import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Texas Prestige Masonry',
    short_name: 'TX Prestige',
    description: 'Premium masonry services — outdoor kitchens, pavers, chimneys, brick & block, fire pits, and stone repairs across Texas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#C5A059',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/images/pwa/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/pwa/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/pwa/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/pwa/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
