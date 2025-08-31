'use client'
import { SectionConfig } from '@/config/layout'

export default function Footer({
  section,
}: {
  section: Extract<SectionConfig, { id: 'footer' }>
}) {
  const text = section.text || '© 2025 Your Name. All rights reserved.'
  const note = section.note || 'Built with Next.js + Tailwind' // 👈 dynamic
  const variant = section.variant || 'default'

  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800 mt-20">
      {variant === 'default' && (
        <div className="container py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <p>{text}</p>
          <div className="opacity-70">{note}</div>
        </div>
      )}

      {variant === 'centered' && (
        <div className="container py-8 text-center text-sm space-y-3">
          <p>{text}</p>
          <div className="opacity-70">{note}</div>
        </div>
      )}

      {variant === "social" && (
        <div className="container py-8 text-sm flex flex-col items-center gap-3">
          <p>{text}</p>

          {Array.isArray(section.socials) && section.socials.length > 0 && (
            <div className="flex gap-4 opacity-80">
              {section.socials.map((sm, i) => (
                <a
                  key={i}
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 underline"
                >
                  {sm.platform}
                </a>
              ))}
            </div>
          )}

          {note && <div className="opacity-70">{note}</div>}
        </div>
      )}

    </footer>
  )
}
