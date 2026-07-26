# Obsidian River

Luxury epoxy & hardwood atelier shop — Next.js on Vercel, Railway Postgres via Drizzle, quote inquiries with a light admin.

## Stack

- Next.js (App Router) + Tailwind CSS
- Drizzle ORM + Railway PostgreSQL (`postgres` driver)
- Admin session cookies (`jose`)
- Design guidance from [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

## Local setup

```bash
cp .env.example .env.local
# fill DATABASE_URL (Railway), ADMIN_PASSWORD, ADMIN_SESSION_SECRET

npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: `/admin/login`.

Catalog pages fall back to static product data if `DATABASE_URL` is missing. Quote submissions and admin inquiry lists require the database.

## Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Railway Postgres connection string |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `ADMIN_SESSION_SECRET` | Cookie signing secret |

## Deploy on Vercel

1. Import `mikirov/wood-shop`
2. Set `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`
3. Deploy, then run `npm run db:push` and `npm run db:seed` against Railway

## Collection

**Tables**
1. Midnight Vein Dining Table — from €11,900
2. Ember Fracture Console — from €4,250
3. Ashmoor Conference Slab — from €16,800

**Smaller pieces**
4. Night Tide Coasters (set of 4) — from €68
5. Ember Grain Cutting Board — from €185
6. Ash Vein Catch Tray — from €145
