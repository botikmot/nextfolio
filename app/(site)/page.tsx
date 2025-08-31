"use client";
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { layout as defaultLayout, SectionConfig } from '@/config/layout'
import { theme as defaultTheme } from "@/config/layout";
import { useTheme } from "next-themes"
//import { layout } from '@/config/layout'
//import LayoutSettings from '@/components/LayoutSettings'
import DevToolsProvider from "@/components/DevToolsProvider"
import { useState, useEffect } from 'react'

const registry = {
  header: Header,
  hero: Hero,
  about: About,
  projects: Projects,
  services: Services,
  testimonials: Testimonials,
  contact: Contact,
  footer: Footer,
} as const

export default function HomePage() {
  const [layout, setLayout] = useState<SectionConfig[]>(defaultLayout);
  const [theme, setTheme] = useState(defaultTheme);
  const { resolvedTheme } = useTheme()

  useEffect(() => {
  const header = layout.find(s => s.id === 'header');
    if (header?.siteName) {
      document.title = header.siteName;
    }
  }, [layout]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-body", theme.font.body)
    document.documentElement.style.setProperty("--font-heading", theme.font.heading)

    const isDark = resolvedTheme === "dark"

    document.documentElement.style.setProperty("--brand", theme.colors.brand)
    document.documentElement.style.setProperty("--brandHover", theme.colors.brandHover)
  }, [theme, resolvedTheme])


  return (
    <>
      {layout.map((s) => {
        if (!s.enabled) return null
        const C = registry[s.id] as any
        return <C key={s.id} section={s} />   // ✅ always pass "section"
      })}

      {/* Show LayoutSettings only in dev mode */}
      <DevToolsProvider onChange={setLayout} onThemeChange={setTheme} />
    </>
  )
}