'use client'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { SectionConfig } from '@/config/layout'

export default function Header({
  section,
}: {
  section: Extract<SectionConfig, { id: 'header' }>
}) {
  const nav = section.nav || []
  const siteName = section.siteName || 'My Portfolio'
  const ctaLabel = section.ctaLabel || ''
  const ctaHref = section.ctaHref || '#contact'
  const headTitle = section.headTitle || siteName

  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>

      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800">
        <div className="container flex items-center justify-between h-16">
          {/* Logo / Site name */}
          <Link href="#" className="font-semibold">
            {siteName}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="opacity-80 hover:opacity-100"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right Side (CTA + Theme + Hamburger) */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              {ctaLabel && (
                <a href={ctaHref} className="btn btn-primary">
                  {ctaLabel}
                </a>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <nav className="flex flex-col p-4 gap-4 text-sm">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)} // close after click
                  className="opacity-80 hover:opacity-100"
                >
                  {n.label}
                </a>
              ))}
              {ctaLabel && (
                <a
                  href={ctaHref}
                  className="btn btn-primary w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel}
                </a>
              )}
              <ThemeToggle />
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
