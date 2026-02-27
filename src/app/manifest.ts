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
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
