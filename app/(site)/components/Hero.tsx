import Image from "next/image";
import { SectionConfig } from "@/config/layout";

export default function Hero({
  section,
}: {
  section: Extract<SectionConfig, { id: "hero" }>
}) {
  const variant = section.variant || "split";
  const role = section.role || "Developer";
  const headline = section.headline || "Welcome";
  const tagline = section.tagline || "Build something great";
  const textColor = section.textColor;
  const bgColor = section.bgColor;
  const image = section.image;

  const textCls = textColor ? `text-[${textColor}]` : "text-brand/80";
  const bgCls = bgColor ? `bg-[${bgColor}]` : "";

  const sizeClasses: Record<string, string> = {
    small: "w-32 h-32 md:w-40 md:h-40",   // 128px / 160px
    medium: "w-48 h-48 md:w-64 md:h-64",  // 192px / 256px
    large: "w-64 h-64 md:w-80 md:h-80",   // 256px / 320px
  };

  const shapeClass = section.imageShape === "square" ? "rounded-lg" : "rounded-full"; 



  // Centered variant
  if (variant === "centered") {
    return (
      <section className={`container pt-16 pb-24 md:pt-24 md:pb-32 text-center ${bgCls}`}>
        <div className="mb-10">
          <Image
            src={image || "/avatar.png"}
            alt="Avatar"
            width={240}
            height={240}
            className={`${sizeClasses[section.imageSize || "medium"]} ${shapeClass} border border-neutral-200/70 dark:border-neutral-800 object-cover mx-auto`}
          />
        </div>
        <p className={`text-sm uppercase tracking-widest ${textCls}`}>{role}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-3">{headline}</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-prose mx-auto">{tagline}</p>
        <div className="mt-8 flex justify-center flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">View Work</a>
          <a href="/resume.pdf" className="btn" download>Download CV</a>
        </div>
      </section>
    );
  }

  // Image-left variant
  if (variant === "image-left") {
    return (
      <section className={`container pt-16 pb-24 md:pt-24 md:pb-32 ${bgCls}`}>
        <div className="grid md:grid-cols-2 gap-0 items-center">
          <div className="md:col-span-1 md:pl-0">
            <Image
              src={image || "/avatar.png"}
              alt="Avatar"
              width={360}
              height={360}
              className={`${sizeClasses[section.imageSize || "medium"]} ${shapeClass} border border-neutral-200/70 dark:border-neutral-800 object-cover mx-auto`}
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-center -ml-8 md:-ml-0">
            <p className={`text-sm uppercase tracking-widest ${textCls}`}>{role}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3">{headline}</h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-prose">{tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">View Work</a>
              <a href="/resume.pdf" className="btn" download>Download CV</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: split variant
  return (
    <section className={`container pt-16 pb-24 md:pt-24 md:pb-32 ${bgCls}`}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className={`text-sm uppercase tracking-widest ${textCls}`}>{role}</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3">{headline}</h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-prose">{tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">View Work</a>
            <a href="/resume.pdf" className="btn" download>Download CV</a>
          </div>
        </div>
        <div className="justify-self-center">
          <Image
            src={image || "/avatar.png"}
            alt="Avatar"
            width={360}
            height={360}
            className={`${sizeClasses[section.imageSize || "medium"]} ${shapeClass} border border-neutral-200/70 dark:border-neutral-800 object-cover`}
          />
        </div>
      </div>
    </section>
  );
}
