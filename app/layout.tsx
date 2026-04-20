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
  description: "You're invited to the wedding of Robert Kharmuti & L Matti Bakor Nonglait, 30 May 2026 at The Ratson Pavillion",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${italiana.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
