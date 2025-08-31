import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/components/Providers'
import { site } from '@/data/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.siteUrl,
    siteName: site.name,
    images: ['/og-image.png'],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}