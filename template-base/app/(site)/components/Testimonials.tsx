import Image from "next/image";
import Section from "./Section";
import { SectionConfig } from "@/config/layout";
import { useState } from "react";

export default function Testimonials({
  section,
}: {
  section: Extract<SectionConfig, { id: "testimonials" }>;
}) {
  const headline = section.headline || "Testimonials";
  const subtitle = section.subtitle || "Kind words from clients";
  const testimonials = section.testimonials || [];
  const variant = section.variant || "carousel";

  if (testimonials.length === 0) return null;

  const [i, setI] = useState(0);
  const t = testimonials[i] || { quote: "", author: "", role: "", image: "", size: "medium" };

  // Map size field to Tailwind width/height
  const sizeClasses: Record<string, string> = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  const renderCard = (t: typeof testimonials[0], idx?: number) => (
    <div key={idx} className="card p-6 text-center">
      {t.image && (
        <div
          className={`mb-4 rounded-full overflow-hidden mx-auto ${
            sizeClasses[t.size || "medium"]
          }`}
        >
          <Image
            src={t.image}
            alt={t.author}
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      )}
      <p className="text-lg leading-relaxed">“{t.quote}”</p>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        — {t.author}, {t.role}
      </p>
    </div>
  );

  return (
    <Section id="testimonials" title={headline} subtitle={subtitle}>
      {/* Carousel */}
      {variant === "carousel" && (
        <div className="flex flex-col items-center">
          {renderCard(t)}
          <div className="mt-6 flex gap-3">
            <button
              className="btn"
              onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={() => setI((i + 1) % testimonials.length)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Grid layout */}
      {variant === "grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => renderCard(t, idx))}
        </div>
      )}

      {/* Card list */}
      {variant === "card-list" && (
        <div className="flex flex-col gap-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="card p-6 flex items-center gap-4">
              {t.image && (
                <div
                  className={`flex-shrink-0 rounded-full overflow-hidden ${
                    sizeClasses[t.size || "medium"]
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.author}
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="text-left flex-1">
                <p className="text-lg leading-relaxed">“{t.quote}”</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  — {t.author}, {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
