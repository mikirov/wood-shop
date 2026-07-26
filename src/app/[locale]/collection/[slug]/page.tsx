import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd, productJsonLd } from "@/components/json-ld";
import { CATALOG } from "@/lib/catalog";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProductBySlug } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATALOG.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const product = await getProductBySlug(slug, locale);
  if (!product) return { title: "Not found" };
  const siteUrl = getSiteUrl();
  return {
    title: `${product.name} · Obsidian River`,
    description: product.tagline,
    alternates: {
      canonical: `${siteUrl}/${locale}/collection/${slug}`,
      languages: {
        en: `${siteUrl}/en/collection/${slug}`,
        bg: `${siteUrl}/bg/collection/${slug}`,
      },
    },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: `${siteUrl}${product.heroImage}` }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();
  const p = dictionary.product;
  const isFixed = product.pricing.type === "fixed";

  return (
    <div className="pt-20">
      <JsonLd
        data={productJsonLd({
          locale,
          name: product.name,
          description: product.description,
          image: product.heroImage,
          slug: product.slug,
          priceEur:
            product.pricing.type === "fixed"
              ? product.pricing.amountEur
              : undefined,
        })}
      />
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 pb-16 md:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              {product.category === "table" ? p.signature : p.object}
            </p>
            <h1 className="mt-4 font-serif text-5xl text-foreground md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted">{product.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div>
          <h2 className="font-serif text-3xl text-foreground">{p.story}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          <Link
            href={`/${locale}/quote?product=${product.slug}`}
            className="mt-10 inline-flex cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong hover:border-accent-strong"
          >
            {p.quoteCta}
          </Link>
        </div>

        <aside className="space-y-8 border border-border bg-surface p-8">
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {p.materials}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.materials}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {p.dimensions}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.dimensions}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {p.leadTime}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.leadTime}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {p.price}
            </p>
            {isFixed ? (
              <>
                <p className="mt-3 font-serif text-3xl text-foreground">
                  {product.priceLabel}
                </p>
                <p className="mt-2 text-xs text-muted">{p.fixedNote}</p>
              </>
            ) : (
              <>
                <p className="mt-3 font-serif text-2xl text-foreground">
                  {dictionary.collection.quoteBadge}
                </p>
                <p className="mt-2 text-xs text-muted">{p.quoteNote}</p>
              </>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
