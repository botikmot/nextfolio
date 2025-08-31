import Section from "./Section";
import { SectionConfig } from "@/config/layout";

export default function About({
  section,
}: {
  section: Extract<SectionConfig, { id: "about" }>
}) {
  const variant = section.variant || "split";
  const headline = section.headline || "About Me";
  const text = section.text || "";
  const textColor = section.textColor;
  const bgColor = section.bgColor;
  const skills = section.skills || [];
  const skillsTitle = section.skillsTitle || "Skills";

  const textCls = textColor ? `text-[${textColor}]` : "text-neutral-800 dark:text-neutral-200";
  const bgCls = bgColor ? `bg-[${bgColor}]` : "";

  // Centered variant
  if (variant === "centered") {
    return (
      <Section id="about" title={headline} subtitle="">
        <div className={`text-center ${bgCls}`}>
          <p className={`max-w-prose mx-auto mb-4 ${textCls}`}>{text}</p>
          {skills.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">{skillsTitle}</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-brand/10 dark:bg-brandDark/20 text-sm rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Section>
    );
  }

  // Centered variant
  if (variant === "skills-left") {
    return (
      <Section id="about" title={headline} subtitle="">
        <div className={`grid md:grid-cols-3 gap-8 ${bgCls}`}>
          {skills.length > 0 && (
            <div className="md:col-span-1 flex flex-col gap-2">
              <h4 className="font-semibold">{skillsTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-brand/10 dark:bg-brandDark/20 text-sm rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className={`md:col-span-2 leading-relaxed ${textCls}`}>{text}</p>
        </div>
      </Section>
    );
  }

  // Default split variant
  return (
    <Section id="about" title={headline} subtitle="">
      <div className={`grid md:grid-cols-3 gap-8 ${bgCls}`}>
        <p className={`md:col-span-2 leading-relaxed ${textCls}`}>{text}</p>
        {skills.length > 0 && (
          <div className="md:col-span-1 flex flex-col gap-2">
            <h4 className="font-semibold">{skillsTitle}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-brand/10 dark:bg-brandDark/20 text-sm rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
