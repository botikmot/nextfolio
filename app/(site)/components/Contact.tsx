'use client'
import { useState } from 'react'
import Section from './Section'
import { SectionConfig } from '@/config/layout'

export default function Contact({
  section,
}: {
  section: Extract<SectionConfig, { id: 'contact' }>
}) {
  const headline = section.headline || "Contact"
  const subtitle = section.subtitle || "Reach out"
  const location = section.location || "Open to remote work worldwide"
  const socials = section.socialMedia || []
  const variant = section.variant || "default"
  const cardBgClass = section.bgColor || ""
 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | 'success' | 'error'>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="contact" title={headline} subtitle={subtitle}>
      {variant === "stacked" ? (
        <div className="flex flex-col gap-6">
          <form className="card p-6" onSubmit={handleSubmit}>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full mb-6 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 mt-2 text-sm">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 mt-2 text-sm">Failed to send message. Please try again.</p>
            )}
          </form>

          <div className="flex flex-col gap-4">
            {socials.length > 0 && (
              <div className={`card p-6 ${cardBgClass}`}>
                <h3 className="font-semibold mb-2">Social</h3>
                <ul className="space-y-2 text-sm">
                  {socials.map((sm, i) => (
                    <li key={i}>
                      <a href={sm.url} target="_blank" className="underline">{sm.platform}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={`card p-6 ${cardBgClass}`}>
              <h3 className="font-semibold mb-2">Location</h3>
              {location.includes("iframe") ? (
                // User pasted a full <iframe> snippet
                <div
                  className="w-full h-64 rounded overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: location
                      .replace(/width="\d+"/g, 'width="100%"') // override width
                      .replace(/height="\d+"/g, 'height="100%"') // override height
                      .replace(/style="[^"]*"/g, ''), // remove inline styles
                  }}
                />
              ) : location.startsWith("https://www.google.com/maps/embed") ? (
                // User pasted only the embed URL
                <div className="w-full h-64">
                  <iframe
                    src={location}
                    className="w-full h-full rounded"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              ) : (
                // Plain text fallback
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{location}</p>
              )}
            </div>

          </div>
        </div>
      ) : (
        // default / card-bg variant: grid layout
        <div className="grid md:grid-cols-2 gap-8">
          <form className="card p-6" onSubmit={handleSubmit}>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full mb-6 rounded-xl border p-3 bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-neutral-800"
            />

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 mt-2 text-sm">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 mt-2 text-sm">Failed to send message. Please try again.</p>
            )}
          </form>

          <div className="space-y-4">
            {socials.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold mb-2">Social</h3>
                <ul className="space-y-2 text-sm">
                  {socials.map((sm, i) => (
                    <li key={i}>
                      <a href={sm.url} target="_blank" className="underline">
                        {sm.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={`card p-6 ${cardBgClass}`}>
              <h3 className="font-semibold mb-2">Location</h3>
              {location.includes("iframe") ? (
                // User pasted a full <iframe> snippet
                <div
                  className="w-full h-64 rounded overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: location
                      .replace(/width="\d+"/g, 'width="100%"') // override width
                      .replace(/height="\d+"/g, 'height="100%"') // override height
                      .replace(/style="[^"]*"/g, ''), // remove inline styles
                  }}
                />
              ) : location.startsWith("https://www.google.com/maps/embed") ? (
                // User pasted only the embed URL
                <div className="w-full h-64">
                  <iframe
                    src={location}
                    className="w-full h-full rounded"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              ) : (
                // Plain text fallback
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{location}</p>
              )}

            </div>

          </div>
      </div>
      )}
    </Section>
  )
}
