'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const current = resolvedTheme === 'dark' ? 'dark' : 'light'
  return (
    <button aria-label="Toggle theme" onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')} className="btn">
      {current === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}