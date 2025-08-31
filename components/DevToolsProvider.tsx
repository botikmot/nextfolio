"use client"
import { useEffect, useState } from "react"
import LayoutSettings from "@/components/LayoutSettings"
import { SectionConfig } from "@/config/layout"
import { Settings } from "lucide-react" // icon
import { theme as defaultTheme } from "@/config/theme"

export default function DevToolsProvider({
  onChange,
  onThemeChange,
}: {
  onChange: (layout: SectionConfig[]) => void
  onThemeChange: (theme: typeof defaultTheme) => void
}) {
  const [visible, setVisible] = useState(true)

  // Toggle with keyboard (still supported)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        setVisible((v) => !v)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  // ✅ Only load in dev mode
  if (process.env.NEXT_PUBLIC_ENV !== "development") return null

  return (
    <>
      {/* Floating gear button */}
      <button
        onClick={() => setVisible((v) => !v)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-neutral-900 border hover:scale-105 transition"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Panel */}
      {visible && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-neutral-900 border rounded-lg shadow-lg p-4 max-w-sm">
          <h2 className="font-bold text-lg mb-2">Layout Settings ⚙️</h2>
          <LayoutSettings onChange={onChange} onThemeChange={onThemeChange} onClose={() => setVisible(false)} />
        </div>
      )}
    </>
  )
}
