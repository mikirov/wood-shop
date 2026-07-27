import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd, productJsonLd } from "@/components/json-ld";
import { ProductSlideshow } from "@/components/product-slideshow";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProductBySlug } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const product = await getProductBySlug(slug, locale);
  if (!product || product.category !== "custom") return { title: "Not found" };
  const siteUrl = getSiteUrl();
  return {
    title: `${product.name} · Obsidian River`,
    description: product.tagline,
    alternates: {
      canonical: `${siteUrl}/${locale}/custom/${slug}`,
      languages: {
        en: `${siteUrl}/en/custom/${slug}`,
        bg: `${siteUrl}/bg/custom/${slug}`,
      },
    },
  };
}

export default async function CustomExamplePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const product = await getProductBySlug(slug, locale);
  if (!product || product.category !== "custom") notFound();
  const p = dictionary.product;
  const c = dictionary.custom;

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 pt-6 md:px-10">
        <Link
          href={`/${locale}/custom`}
          className="inline-flex text-xs tracking-[0.16em] text-muted uppercase hover:text-accent"
        >
          ← {dictionary.nav.custom}
        </Link>
      </div>
      <JsonLd
        data={productJsonLd({
          locale,
          name: product.name,
          description: product.description,
          image: product.heroImage.startsWith("data:")
            ? "/brand/mark.svg"
            : product.heroImage,
          slug: product.slug,
          pathPrefix: "custom",
        })}
      />
      <section className="relative mt-4 min-h-[70vh] overflow-hidden">
        <ProductSlideshow
          images={product.images}
          alt={product.name}
          className="min-h-[70vh]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-end px-6 pb-16 md:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              {c.exampleBadge}
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
          <p className="text-sm leading-relaxed text-accent">{c.guideNote}</p>
          <h2 className="mt-6 font-serif text-3xl text-foreground">{p.story}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          <Link
            href={`/${locale}/quote?product=${product.slug}`}
            className="mt-10 inline-flex cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong"
          >
            {c.enquireCta}
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
            <p className="mt-3 font-serif text-2xl text-foreground">
              {dictionary.collection.quoteBadge}
            </p>
            <p className="mt-2 text-xs text-muted">{p.quoteNote}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
