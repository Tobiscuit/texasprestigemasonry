import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { getLocale } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Texas Prestige Masonry — Premium Masonry Services',
  description: 'Premium masonry services across Texas. Outdoor kitchens, custom pavers, chimneys, brick & block, fire pits, and stone repairs for residential and commercial properties.',
  keywords: ['masonry', 'outdoor kitchens', 'pavers', 'chimneys', 'fire pits', 'stone repair', 'brick and block', 'Texas masonry'],
  authors: [{ name: 'Texas Prestige Masonry' }],
  creator: 'Texas Prestige Masonry',
  publisher: 'Texas Prestige Masonry',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/pwa/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://texasprestigemasonry.com',
    title: 'Texas Prestige Masonry — Premium Masonry Services',
    description: 'Premium masonry services across Texas. Outdoor kitchens, custom pavers, chimneys, brick & block, fire pits, and stone repairs.',
    siteName: 'Texas Prestige Masonry',
    images: [
      {
        url: '/images/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Texas Prestige Masonry — Premium Masonry Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Prestige Masonry — Premium Masonry Services',
    description: 'Premium masonry services across Texas. Outdoor kitchens, custom pavers, chimneys, brick & block, fire pits, and stone repairs.',
    images: ['/images/social/og-image.png'],
  },
  alternates: {
    languages: {
      en: '/',
      es: '/es',
    },
  },
}

import { PwaRegistry } from '@/components/PwaRegistry';
import { ThemeProvider } from '@/components/theme-provider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-primary`}>
        <ThemeProvider attribute="data-app-theme" defaultTheme="dark" enableSystem>
          {children}
          <PwaRegistry />
        </ThemeProvider>
      </body>
    </html>
  )
}
