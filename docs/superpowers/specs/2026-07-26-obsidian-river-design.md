# Obsidian River — Design Spec

**Date:** 2026-07-26  
**Repo:** [mikirov/wood-shop](https://github.com/mikirov/wood-shop)  
**Brand:** Obsidian River  
**Status:** Approved for implementation planning

## Summary

Luxury epoxy furniture atelier site for handcrafted wood-and-resin tables. Visitors browse three signature pieces and submit a quote request. Inquiries persist in Neon Postgres (Drizzle ORM). A light password-protected admin reviews and updates inquiry status. No cart or Stripe in v1.

## Goals

- Ship a Vercel-ready Next.js storefront with a smoky, old-school luxury aesthetic
- Showcase three realistic mock epoxy table products
- Capture quote inquiries in Postgres with a minimal admin workflow
- Use [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) for design-system guidance during implementation

## Non-goals (v1)

- Shopping cart, Stripe, or other real-time payments
- Email notifications for new inquiries
- Multi-user admin / roles / CMS for marketing copy
- User accounts or wishlists

## Architecture

| Layer | Choice |
|---|---|
| Framework | Next.js App Router on Vercel |
| Styling | Tailwind CSS + CSS variables; ui-ux-pro-max design tokens |
| ORM | Drizzle |
| Database | Neon Postgres |
| Auth (admin) | Env password (`ADMIN_PASSWORD`) + signed HTTP-only session cookie |
| Products | Seeded in DB (editable later without a full CMS) |
| Images | Generated realistic mock product imagery committed or served from `/public` |

```
Public site  →  Route Handlers / Server Actions  →  Drizzle  →  Neon
Admin (/admin) → same data layer (inquiries + status)
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Full-bleed smoky hero; brand; one headline; CTAs to Collection and Quote |
| `/collection` | Gallery of the three tables |
| `/collection/[slug]` | Product story: imagery, materials, dimensions, lead time, quote CTA (product prefilled) |
| `/about` | Short atelier / craft narrative |
| `/quote` | Inquiry form |
| `/admin` | Login + inquiry list + status updates |
| `/admin/login` | Password gate |

## Products (seed catalog)

1. **Midnight Vein Dining Table** (`midnight-vein`)  
   Live-edge walnut with charcoal–indigo resin river and smoke swirls; blackened steel legs; dining scale (approx. 8–10 seats).

2. **Ember Fracture Console** (`ember-fracture`)  
   Charred oak console with amber–ember fractured resin seam; brass foot caps; entry / bar accent.

3. **Ashmoor Conference Slab** (`ashmoor-conference`)  
   Wide ash with smoky translucent grey epoxy mist and metallic flecks; matte iron trestle; boardroom / library scale.

Each product record includes: name, slug, tagline, description, materials, dimensions text, lead time, optional `priceFrom` display string, image path(s), sort order, active flag.

## Visual system

- **Mood:** Luxury old-school atelier — smoke, charcoal, resin gloss, bold metal accents
- **Palette:** Near-black charcoal backgrounds; warm ash text; deep resin indigo/smoke; aged brass / ember copper for CTAs and rules; subtle grain/noise overlays
- **Typography:** Expressive serif display + refined sans for UI/body (pairing from ui-ux-pro-max; avoid Inter/Roboto/Arial)
- **Hero:** Full-bleed atmospheric imagery; brand first; one headline; one supporting line; one CTA group
- **Motion:** 2–3 intentional moments (hero reveal, subtle smoke/grain, CTA hover) — restrained
- **Anti-patterns:** Purple gradients; cream + terracotta clichés; card-heavy dashboards; emoji-as-icons; weak branding above the fold

## Data model (Drizzle)

### `products`

| Column | Notes |
|---|---|
| `id` | UUID / serial PK |
| `slug` | Unique |
| `name` | |
| `tagline` | Short |
| `description` | Long form |
| `materials` | Text |
| `dimensions` | Text (options / ranges) |
| `leadTime` | Text |
| `priceFrom` | Optional display string (e.g. "From $8,400") |
| `heroImage` | Path |
| `galleryImages` | JSON string array or related table — prefer JSON array of paths for v1 |
| `sortOrder` | Int |
| `active` | Boolean |
| `createdAt` | Timestamp |

### `inquiries`

| Column | Notes |
|---|---|
| `id` | UUID / serial PK |
| `name` | Required |
| `email` | Required |
| `phone` | Optional |
| `productId` | Optional FK → products |
| `preferredDimensions` | Optional text |
| `message` | Required |
| `status` | Enum: `new` \| `contacted` \| `closed` (default `new`) |
| `createdAt` | Timestamp |

## Quote flow

1. User opens `/quote` or arrives from a product page with `?product=<slug>` preselected
2. Client validates required fields (name, email, message)
3. Server action / route handler inserts `inquiries` row
4. Success confirmation on the same page (no cart)
5. Double-submit guarded (disabled button / pending state)

## Admin

- Password from `ADMIN_PASSWORD`; session via signed cookie
- List inquiries newest first; filter by status
- View detail; update status to `new` / `contacted` / `closed`
- No public registration; unauthorized users redirected to login

## Error handling

- Inline field validation on the quote form
- Persist failures → friendly retry message
- Unknown product slug → branded 404
- Admin without session → login
- DB connectivity errors logged server-side; generic client message

## Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `ADMIN_PASSWORD` | Admin gate |
| `ADMIN_SESSION_SECRET` | Cookie signing secret |

## Deployment

- Source: `git@github.com:mikirov/wood-shop.git`
- Host: Vercel
- Neon linked via Vercel Marketplace or env vars
- Seed script runs once (or on deploy) to insert the three products

## Success criteria

- Distinctive Obsidian River brand presence on first viewport
- Three product pages with realistic mock imagery and clear quote CTAs
- Quote submissions appear in Neon and are manageable in `/admin`
- Responsive at 375 / 768 / 1024 / 1440
- Deployed (or deployable) on Vercel from the GitHub repo

## Implementation notes

- Install and apply ui-ux-pro-max (`uipro init --ai cursor`) inside the project before building UI
- Prefer file-by-file implementation after the written plan is approved
- Generate three mock-realistic product images during implementation
