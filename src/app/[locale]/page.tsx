import type { Metadata } from "next";
import { ProductMedia } from "@/components/product-media";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, organizationJsonLd } from "@/components/json-ld";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { faqPageJsonLd } from "@/lib/blog-json-ld";
import { listProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const siteUrl = getSiteUrl();

  return {
    title: dictionary.seo.homeTitle,
    description: dictionary.seo.homeDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        bg: `${siteUrl}/bg`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: dictionary.seo.homeTitle,
      description: dictionary.seo.homeDescription,
      url: `${siteUrl}/${locale}`,
      siteName: dictionary.seo.siteName,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}/products/midnight-vein.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.homeTitle,
      description: dictionary.seo.homeDescription,
      images: [`${siteUrl}/products/midnight-vein.jpg`],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const products = await listProducts(locale);
  const featured =
    products.find((product) => product.category === "shop") ?? products[0];
  const customExamples = products.filter(
    (product) => product.category === "custom",
  );
  const shopItems = products
    .filter((product) => product.category === "shop")
    .filter((product, _index, list) => {
      const family = product.family ?? product.slug;
      return (
        list.find((item) => (item.family ?? item.slug) === family) === product
      );
    })
    .slice(0, 6);
  const t = dictionary.home;

  return (
    <>
      <JsonLd data={organizationJsonLd(locale)} />
      <JsonLd data={faqPageJsonLd(locale, t.faqs)} />
      <section className="relative min-h-[100svh] overflow-hidden">
        {featured ? (
          <ProductMedia
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
            {dictionary.brand}
          </p>
          <h1 className="hero-rise-delay mt-6 max-w-xl font-serif text-2xl leading-snug text-foreground/90 md:text-3xl">
            {t.headline}
          </h1>
          <p className="hero-rise-delay-2 mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            {t.subhead}
          </p>
          <div className="hero-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/shop`}
              className="cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong hover:border-accent-strong"
            >
              {t.ctaCollection}
            </Link>
            <Link
              href={`/${locale}/custom`}
              className="cursor-pointer border border-foreground/30 px-7 py-3 text-xs tracking-[0.2em] text-foreground uppercase hover:border-accent hover:text-accent"
            >
              {t.ctaQuote}
            </Link>
          </div>
        </div>
      </section>

      <section id="shop" className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {t.objectsEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
            {t.objectsTitle}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {t.objectsHint}
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {shopItems.map((product) => (
              <Link
                key={product.slug}
                href={`/${locale}/shop/${product.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-surface">
                  <ProductMedia
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
                      {product.priceLabel}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/shop`}
            className="mt-10 inline-flex cursor-pointer text-xs tracking-[0.16em] text-accent uppercase hover:text-foreground"
          >
            {dictionary.nav.shop} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="border-b border-border pb-6">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {t.tablesEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
            {t.tablesTitle}
          </h2>
          <p className="mt-3 text-sm text-muted">{t.tablesHint}</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {customExamples.map((product) => (
            <Link
              key={product.slug}
              href={`/${locale}/custom/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <ProductMedia
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
                    {dictionary.custom.exampleBadge}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {t.processEyebrow}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
          {t.processTitle}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {t.process.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <Link
          href={`/${locale}/blog`}
          className="mt-12 inline-flex text-xs tracking-[0.16em] text-accent uppercase hover:text-foreground"
        >
          {dictionary.nav.blog} →
        </Link>
      </section>

      <FaqAccordion
        items={t.faqs}
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
      />
    </>
  );
}
