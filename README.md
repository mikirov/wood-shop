# Obsidian River

Luxury epoxy & hardwood atelier shop — Next.js on Vercel, Neon Postgres via Drizzle, quote inquiries with a light admin.

## Stack

- Next.js (App Router) + Tailwind CSS
- Drizzle ORM + Neon Postgres
- Admin session cookies (`jose`)
- Design guidance from [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

## Local setup

```bash
cp .env.example .env.local
# fill DATABASE_URL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET

npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: `/admin/login`.

Catalog pages render from seeded DB rows, with a static catalog fallback if `DATABASE_URL` is missing. Quote submissions and admin inquiry lists require Neon.

## Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `ADMIN_SESSION_SECRET` | Cookie signing secret |

## Deploy on Vercel

1. Import `mikirov/wood-shop`
2. Add a Neon integration (or paste `DATABASE_URL`)
3. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`
4. Deploy, then run `npm run db:push` and `npm run db:seed` against production (or use Neon SQL editor / a one-off job)

## Collection

1. Midnight Vein Dining Table
2. Ember Fracture Console
3. Ashmoor Conference Slab
