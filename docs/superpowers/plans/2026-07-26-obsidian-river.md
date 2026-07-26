# Obsidian River Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Obsidian River — a Next.js luxury epoxy-table atelier site with three seeded products, quote inquiries in Neon via Drizzle, and a password-protected admin.

**Architecture:** Next.js App Router on Vercel; Tailwind design tokens (smoky luxury); products + inquiries in Neon Postgres via Drizzle; quote via Server Action; admin session cookie.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Drizzle ORM, Neon serverless, `jose` for admin sessions, ui-ux-pro-max for design guidance.

## Global Constraints

- Brand name: Obsidian River (verbatim)
- ORM: Drizzle only (no Prisma)
- No cart / Stripe in v1
- Inquiry statuses: `new` | `contacted` | `closed`
- Env: `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- Aesthetic: dark smoky luxury; brass/ember accents; no Inter/Roboto; no purple gradients
- Repo: `git@github.com:mikirov/wood-shop.git`

## File map

| Path | Responsibility |
|---|---|
| `src/app/**` | Routes, layouts, pages |
| `src/components/**` | UI pieces (header, footer, hero, forms) |
| `src/db/schema.ts` | Drizzle tables |
| `src/db/index.ts` | DB client |
| `src/db/seed.ts` | Seed 3 products |
| `src/lib/auth.ts` | Admin session helpers |
| `src/lib/actions/quote.ts` | Create inquiry |
| `src/lib/actions/admin.ts` | Login + status update |
| `public/products/**` | Product images |
| `.env.example` | Required env keys |
| `drizzle.config.ts` | Drizzle Kit config |

---

### Task 1: Scaffold Next.js + tooling

**Files:**
- Create: Next.js app at repo root, Tailwind, ESLint
- Create: `.env.example`, `.gitignore` updates
- Create: ui-ux-pro-max skill install via `uipro init --ai cursor`

- [ ] **Step 1:** `create-next-app` with TypeScript, App Router, Tailwind, `src/` dir, ESLint
- [ ] **Step 2:** Install deps: `drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit`, `jose`, `zod`
- [ ] **Step 3:** `npx uipro init --ai cursor` (or npm install ui-ux-pro-max-cli)
- [ ] **Step 4:** Add `.env.example` with `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- [ ] **Step 5:** Commit scaffold

### Task 2: Database schema + seed

**Files:**
- Create: `src/db/schema.ts`, `src/db/index.ts`, `src/db/seed.ts`, `drizzle.config.ts`

**Produces:**
- `products` and `inquiries` tables
- Seed data for `midnight-vein`, `ember-fracture`, `ashmoor-conference`

- [ ] **Step 1:** Define schema (products + inquiries enums)
- [ ] **Step 2:** Wire Neon + Drizzle client
- [ ] **Step 3:** Seed script for 3 products
- [ ] **Step 4:** Scripts in package.json: `db:generate`, `db:push`, `db:seed`
- [ ] **Step 5:** Commit

### Task 3: Design system + shell

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/site-header.tsx`, `site-footer.tsx`

- [ ] **Step 1:** Run ui-ux-pro-max search for luxury furniture / dark atelier guidance
- [ ] **Step 2:** CSS variables + Google fonts (serif display + refined sans)
- [ ] **Step 3:** Root layout with header/footer
- [ ] **Step 4:** Commit

### Task 4: Public pages

**Files:**
- Create: `src/app/page.tsx`, `collection/page.tsx`, `collection/[slug]/page.tsx`, `about/page.tsx`, `quote/page.tsx`, `not-found.tsx`
- Create: product card / gallery components as needed

- [ ] **Step 1:** Home hero (brand-first, full-bleed)
- [ ] **Step 2:** Collection + product detail from DB
- [ ] **Step 3:** About + Quote pages (form wired in Task 5)
- [ ] **Step 4:** Generate 3 product images into `public/products/`
- [ ] **Step 5:** Commit

### Task 5: Quote Server Action

**Files:**
- Create: `src/lib/actions/quote.ts`, quote form client component

- [ ] **Step 1:** Zod schema + insert inquiry
- [ ] **Step 2:** Prefill product from `?product=`
- [ ] **Step 3:** Success / error UI
- [ ] **Step 4:** Commit

### Task 6: Admin auth + inquiries UI

**Files:**
- Create: `src/lib/auth.ts`, `src/app/admin/login/page.tsx`, `src/app/admin/page.tsx`, `src/middleware.ts` (or proxy)
- Create: admin actions for login/logout/status

- [ ] **Step 1:** Signed cookie session with `jose`
- [ ] **Step 2:** Login page + protect `/admin`
- [ ] **Step 3:** Inquiry list + status update
- [ ] **Step 4:** Commit

### Task 7: Verify + deploy prep

- [ ] **Step 1:** `npm run build` passes (with env stubs where needed)
- [ ] **Step 2:** README with setup (Neon, env, seed, Vercel)
- [ ] **Step 3:** Push to `origin` if credentials allow

---

## Spec coverage checklist

- [x] Architecture Next + Neon + Drizzle + admin
- [x] Routes: home, collection, slug, about, quote, admin
- [x] Three products with correct slugs/names
- [x] Visual system dark luxury
- [x] Inquiry statuses + form fields
- [x] Env vars documented
- [x] No Stripe/cart
