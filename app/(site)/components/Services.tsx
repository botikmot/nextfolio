import Image from 'next/image'
import Section from './Section'
import { SectionConfig } from '@/config/layout'

type ServicesSection = Extract<SectionConfig, { id: 'services' }>

export default function Services({ section }: { section: ServicesSection }) {
  const { headline, subtitle, services = [], grid = '4-col' } = section

  return (
    <Section id="services" title={headline || "Services"} subtitle={subtitle || "How I can help"}>
      <div
        className={`grid sm:grid-cols-2 ${grid === "4-col" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}
      >
        {services.map((s) => (
          <div key={s.title} className="card p-6 flex flex-col gap-1">
            <div className="w-full flex-shrink-0">
              {s.icon?.startsWith("http") || s.icon?.startsWith("/uploads/") ? (
                // Image uploaded → full width, object-cover
                <div className="h-32 w-full relative rounded overflow-hidden">
                  <Image
                    src={s.icon}
                    alt={s.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                // Text/emoji icon → centered
                <div className="flex items-center justify-center h-32 text-4xl">
                  {s.icon}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg text-left">{s.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-left">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
