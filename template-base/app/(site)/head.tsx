// app/(site)/layout.tsx
import Header from './components/Header'
import { SectionConfig } from '@/config/layout'

export default function RootLayout({ children, layout }: { children: React.ReactNode, layout: SectionConfig[] }) {
  const headerSection = layout.find(s => s.id === 'header')
  const title = headerSection?.headTitle || headerSection?.siteName || 'My Portfolio'

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        {headerSection?.enabled && <Header section={headerSection} />}
        {children}
      </body>
    </html>
  )
}
