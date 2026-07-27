import type { Metadata } from "next";
import Link from "next/link";
import { ProductMedia } from "@/components/product-media";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { listProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const siteUrl = getSiteUrl();
  return {
    title: `${d.custom.title} · ${d.brand}`,
    description: d.custom.intro,
    alternates: {
      canonical: `${siteUrl}/${locale}/custom`,
      languages: {
        en: `${siteUrl}/en/custom`,
        bg: `${siteUrl}/bg/custom`,
      },
    },
  };
}

export default async function CustomPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const examples = (await listProducts(locale)).filter(
    (p) => p.category === "custom",
  );
  const c = dictionary.custom;

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">{c.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
          {c.title}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {c.intro}
        </p>
        <p className="mt-4 text-sm text-muted">
          {c.shopHint}{" "}
          <Link
            href={`/${locale}/shop`}
            className="cursor-pointer text-accent hover:text-foreground"
          >
            {c.shopLink}
          </Link>
        </p>
        <Link
          href={`/${locale}/quote`}
          className="mt-8 inline-flex cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong"
        >
          {c.enquireCta}
        </Link>
      </div>

      <div className="mt-16 space-y-0">
        {examples.map((product, index) => (
          <Link
            key={product.slug}
            href={`/${locale}/custom/${product.slug}`}
            className="group relative block min-h-[60vh] overflow-hidden"
          >
            <ProductMedia
              src={product.heroImage}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
              priority={index === 0}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                index % 2 === 0
                  ? "from-background/90 via-background/50 to-transparent"
                  : "from-transparent via-background/50 to-background/90"
              }`}
            />
            <div
              className={`relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-end px-6 py-16 md:px-10 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="max-w-lg">
                <p className="text-xs tracking-[0.2em] text-accent uppercase">
                  {c.exampleBadge}
                </p>
                <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {product.tagline}
                </p>
                <p className="mt-6 text-xs tracking-[0.18em] text-foreground uppercase group-hover:text-accent">
                  {c.viewExample} →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
