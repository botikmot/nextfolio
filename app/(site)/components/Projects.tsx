import Image from 'next/image';
import Section from './Section';
import { SectionConfig } from '@/config/layout';

export default function Projects({
  section,
}: {
  section: Extract<SectionConfig, { id: 'projects' }>
}) {
  const headline = section.headline || 'Selected Projects';
  const projects = section.projects || [];
  const grid = section.grid || '3-col';
  const textColor = section.textColor;
  const bgColor = section.bgColor;

  const textCls = textColor ? `text-[${textColor}]` : 'text-neutral-800 dark:text-neutral-200';
  const bgCls = bgColor ? `bg-[${bgColor}]` : '';
  const colClass = grid === '2-col' ? 'sm:grid-cols-2 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  if (projects.length === 0) return null;

  return (
    <Section id="projects" title={headline} subtitle="">
      <div className={`grid ${colClass} gap-6 ${bgCls}`}>
        {projects.map((p, i) => {
          const projectImage = p.uploadedImage || p.image || '/placeholder.png';

          return (
            <a
              key={i}
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card overflow-hidden group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={projectImage}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{p.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
