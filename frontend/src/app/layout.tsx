import type { Metadata } from 'next'
import { Nunito, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { SettingsProvider } from '@/context/SettingsContext'
import ClientLayout from '@/components/layout/ClientLayout'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'KATHELYNCRAFT — Sacs de luxe en perles, faits main',
  description:
    'Créations artisanales de sacs de luxe en perles. Élégance faite main, pièces uniques livrées avec soin.',
  keywords:
    'sacs de luxe, perles, fait main, artisanal, KATHELYNCRAFT, sacs à main, haute couture, bijoux',
  authors: [{ name: 'KATHELYNCRAFT' }],
  openGraph: {
    title: 'KATHELYNCRAFT — Sacs de luxe en perles',
    description:
      'Créations artisanales de sacs de luxe en perles. Élégance faite main.',
    url: 'https://kathelyncraft.com',
    siteName: 'KATHELYNCRAFT',
    images: [
      {
        url: 'https://kathelyncraft.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${nunito.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        />
      </head>
      <body className={nunito.className}>
        <AuthProvider>
          <SettingsProvider>
            <CartProvider>
              <ClientLayout>{children}</ClientLayout>
            </CartProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}