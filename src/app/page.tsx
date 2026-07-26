import Image from "next/image";
import Link from "next/link";
import { listProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await listProducts();
  const featured = products[0];
  const tables = products.filter((product) => product.sortOrder <= 3);
  const smallPieces = products.filter((product) => product.sortOrder > 3);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        {featured ? (
          <Image
            src={featured.heroImage}
            alt={featured.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="smoke-veil smoke-drift absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
          <p className="hero-rise font-serif text-5xl tracking-[0.2em] text-foreground uppercase md:text-7xl lg:text-8xl">
            Obsidian River
          </p>
          <h1 className="hero-rise-delay mt-6 max-w-xl font-serif text-2xl leading-snug text-foreground/90 md:text-3xl">
            Tables carved from smoke, steel, and living wood.
          </h1>
          <p className="hero-rise-delay-2 mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Bespoke epoxy river pieces for dining rooms that prefer dusk to daylight.
          </p>
          <div className="hero-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <Link
              href="/collection"
              className="cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong hover:border-accent-strong"
            >
              View collection
            </Link>
            <Link
              href="/quote"
              className="cursor-pointer border border-foreground/30 px-7 py-3 text-xs tracking-[0.2em] text-foreground uppercase hover:border-accent hover:text-accent"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              Signature tables
            </p>
            <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
              The collection
            </h2>
          </div>
          <Link
            href="/collection"
            className="hidden cursor-pointer text-xs tracking-[0.18em] text-muted uppercase hover:text-accent md:inline"
          >
            See all
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {tables.map((product) => (
            <Link
              key={product.slug}
              href={`/collection/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-2xl text-foreground">
                    {product.name}
                  </p>
                  <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                  <p className="mt-3 text-xs tracking-[0.12em] text-accent uppercase">
                    {product.priceFrom}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            Atelier objects
          </p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
            Smaller pieces
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Coasters, boards, and trays — the same smoke-and-resin language, scaled for everyday ritual.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {smallPieces.map((product) => (
              <Link
                key={product.slug}
                href={`/collection/${product.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-surface">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-serif text-2xl text-foreground">
                      {product.name}
                    </p>
                    <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                    <p className="mt-3 text-xs tracking-[0.12em] text-accent uppercase">
                      {product.priceFrom}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
