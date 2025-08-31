# Personal Portfolio + Resume Template (Next.js 14 + Tailwind)
Dark/Light mode, Framer Motion, SEO, data-driven content, **theme & layout config**.

---

## ✅ Prerequisites
- Node.js 18+ (recommend 20)
- pnpm (or npm/yarn)

```bash
corepack enable   # enables pnpm if not installed
```

## 1) Install
```bash
pnpm i or npm install
```

## 2) Run dev
```bash
pnpm dev or npm run dev
# http://localhost:3000
```

## 3) Configure (Easy)
- Edit content: `data/*`
- Toggle sections / change order: `config/layout.ts`
- Theme colors & fonts: `config/theme.ts`
- Replace assets: `public/avatar.png`, `public/projects/*`, `public/resume.pdf`
- Set site URL: `.env -> SITE_URL`

## 4) Contact form (optional)
- Create Formspree form and copy endpoint URL
- Set `.env` -> `FORMSPREE_ENDPOINT=...`
- Redeploy

## 5) Deploy (Vercel)
- Push to GitHub, import into Vercel
- Set env var `SITE_URL=https://your-domain`
- Build → Deploy

## 6) Sell / Package
- Zip the folder
- Publish demo URL
- List on Gumroad/LemonSqueezy/ThemeForest