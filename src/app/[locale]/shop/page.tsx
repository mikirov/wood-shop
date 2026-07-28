import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopProductCard } from "@/components/shop-product-card";
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
    title: `${d.shop.title} · ${d.brand}`,
    description: d.shop.intro,
    alternates: {
      canonical: `${siteUrl}/${locale}/shop`,
      languages: {
        en: `${siteUrl}/en/shop`,
        bg: `${siteUrl}/bg/shop`,
      },
    },
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const products = (await listProducts(locale)).filter(
    (p) => p.category === "shop",
  );
  const s = dictionary.shop;

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">{s.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
          {s.title}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {s.intro}
        </p>
        <p className="mt-4 text-sm text-muted">
          {s.customHint}{" "}
          <Link
            href={`/${locale}/custom`}
            className="cursor-pointer text-accent hover:text-foreground"
          >
            {s.customLink}
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-6 pb-24 md:grid-cols-3 md:px-10">
        {products.map((product) => (
          <ShopProductCard
            key={product.slug}
            locale={locale}
            dictionary={dictionary}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
