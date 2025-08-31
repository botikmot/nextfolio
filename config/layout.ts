import layoutData from './layout.json';

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
  size: string;
};

export type SocialMediaLink = {
  platform: string;
  url: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  uploadedImage: string;
  liveUrl: string;
};

export type SectionConfig =
  | {
      id: "header";
      enabled: boolean;
      siteName?: string;
      nav?: { href: string; label: string }[];
      ctaLabel?: string;
      ctaHref?: string;
      textColor?: string;
      bgColor?: string;
      headTitle?: string;
    }
  | {
      id: "hero";
      enabled: boolean;
      variant?: "split" | "centered" | "image-left";
      role?: string;
      headline?: string;
      tagline?: string;
      textColor?: string;
      bgColor?: string;
      image?: string;
      imageShape?: string;
      imageSize?: string;
    }
  | {
      id: "about";
      enabled: boolean;
      variant?: "split" | "centered" | "skills-left";
      headline?: string;
      skills?: string[];
      skillsTitle?: string;
      text?: string;
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "projects";
      enabled: boolean;
      grid?: "2-col" | "3-col";
      headline?: string;
      projects?: ProjectItem[]; // added to allow dynamic projects
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "services";
      enabled: boolean;
      grid?: "3-col" | "4-col";
      headline?: string;
      subtitle?: string;
      services?: { title: string; description: string; icon: string }[];
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "testimonials";
      enabled: boolean;
      headline?: string;
      subtitle?: string;
      variant?: string;
      testimonials?: Testimonial[];
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "contact";
      enabled: boolean;
      headline?: string;
      subtitle?: string;
      variant?: string;
      location?: string;
      socialMedia?: SocialMediaLink[];
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "footer";
      enabled: boolean;
      text?: string;
      note?: string;
      variant?: string;
      textColor?: string;
      bgColor?: string;
      socials?: string[];
    };

export const layout: SectionConfig[] = layoutData.sections;
export const theme = layoutData.theme;

/* export const layout: SectionConfig[] = [
  {
    id: "header",
    enabled: true,
    siteName: "My Portfolio",
    nav: [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#services", label: "Services" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#contact", label: "Contact" },
    ],
    ctaLabel: "Hire Me",
    ctaHref: "#contact",
    headTitle: "My Portfolio",
  },
  { 
    id: "hero", 
    enabled: true, 
    variant: "split", 
    headline: "I build clean, fast web experiences.", 
    tagline: "Available for freelance and full‑time roles. I design and build apps that users love.", 
    role: "Full‑Stack Developer" 
  },
  { 
    id: "about", 
    enabled: true, 
    variant: "split", 
    headline: "About Me", 
    text: "With 5+ years building products across startups and agencies, I ship reliable, accessible, and performant experiences. I care about clean code, thoughtful UX, and measurable outcomes.",
    skills: ["HTML", "CSS", "JavaScript"], 
    skillsTitle: "My Skills"
  },
  { 
    id: "projects", 
    enabled: true, 
    grid: "3-col", 
    headline: "My Projects",
    projects: [
      { title: "SaaS Dashboard", description: "Analytics dashboard with auth, charts, and billing.", image: "/projects/p1.png", liveUrl: "https://example.com" },
      { title: "E‑commerce Store", description: "Headless shop with cart and checkout.", image: "/projects/p2.png", liveUrl: "https://example.com" },
      { title: "Portfolio Site", description: "Blazing fast personal portfolio with CMS.", image: "/projects/p3.png", liveUrl: "https://example.com" },
    ]
  },
  {
    id: "services",
    enabled: true,
    grid: "4-col",
    headline: "Services",
    subtitle: "How I can help",
    services: [
      { title: "Web Development", description: "Modern, responsive websites and apps.", icon: "💻" },
      { title: "UI/UX Design", description: "Clean interfaces focused on outcomes.", icon: "🎨" },
      { title: "Performance", description: "Core Web Vitals & accessibility.", icon: "⚡" },
      { title: "SEO", description: "Technical SEO & best practices.", icon: "🔍" },
    ]
  },
  { 
    id: "testimonials", 
    enabled: true, 
    headline: "Happy Clients",
    subtitle: "Kind words from clients",
    testimonials: [
      { quote: 'Delivered ahead of schedule and exceeded expectations.', author: 'Alex R.', role: 'Product Lead' },
      { quote: 'Fantastic attention to detail and communication.', author: 'Jamie L.', role: 'Founder' },
      { quote: 'Our metrics improved within weeks after launch.', author: 'Sam T.', role: 'Marketing Director' },
    ] 
  },
  {
    id: "contact",
    enabled: true,
    headline: "Get In Touch",
    subtitle: "Let’s build something great",
    location: "Open to remote work worldwide",
    socialMedia: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "GitHub", url: "https://github.com" },
      { platform: "Instagram", url: "https://instagram.com" },
    ],
  },
  {
    id: "footer",
    enabled: true,
    text: "© 2025 Your Name. All rights reserved.",
  },
]; */

export const presets: Record<string, SectionConfig[]> = {
  minimal: [
    { id: "hero", enabled: true, variant: "centered", headline: "Welcome" },
    { id: "about", enabled: true, headline: "About Me" },
    { id: "projects", enabled: true, grid: "2-col", headline: "Projects", projects: [] },
    { id: "contact", enabled: true, headline: "Contact" },
  ],
  creative: [
    { id: "hero", enabled: true, variant: "split", headline: "Creative Start", tagline: "Think Different", role: "Designer" },
    { id: "about", enabled: true, headline: "About Me" },
    { id: "services", enabled: true, grid: "4-col", headline: "My Services" },
    { id: "projects", enabled: true, grid: "3-col", headline: "Projects", projects: [] },
    { id: "testimonials", enabled: true, headline: "Testimonials" },
    { id: "contact", enabled: true, headline: "Contact" },
    { id: "footer", enabled: true, text: "© 2025 Creative Portfolio" },
  ],
};
