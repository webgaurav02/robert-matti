import type { Metadata } from 'next'
import { Cormorant_Garamond, Italiana, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const italiana = Italiana({
  variable: '--font-italiana',
  subsets: ['latin'],
  weight: ['400'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Robert & Matti — Wedding Invitation',
  description:
    "You're invited to the wedding of Robert Kharmuti & L Matti Bakor Nonglait. Join us on Saturday, 30 May 2026 at The Ratson Pavillion to celebrate our special day.",
  keywords: [
    'Robert Kharmuti',
    'L Matti Bakor Nonglait',
    'wedding',
    'wedding invitation',
    '30 May 2026',
    'The Ratson Pavillion',
  ],
  authors: [{ name: 'Robert & Matti' }],
  creator: 'Robert & Matti',
  metadataBase: new URL('https://robert-matti.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Robert & Matti — Wedding Invitation',
    description:
      "You're invited to celebrate the wedding of Robert & Matti on 30 May 2026 at The Ratson Pavillion.",
    url: '/',
    siteName: 'Robert & Matti Wedding',
    images: [
      {
        url: '/images/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Robert & Matti — Wedding',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robert & Matti — Wedding Invitation',
    description:
      "You're invited to celebrate the wedding of Robert & Matti on 30 May 2026.",
    images: ['/images/hero.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/hero.jpeg',
    apple: '/images/hero.jpeg',
  },
  other: {
    'theme-color': '#2e2842',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${italiana.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/bg.jpg"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
