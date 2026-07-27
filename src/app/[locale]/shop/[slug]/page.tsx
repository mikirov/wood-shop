import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { JsonLd, productJsonLd } from "@/components/json-ld";
import { ProductSlideshow } from "@/components/product-slideshow";
import { ResinVariantPicker } from "@/components/resin-variant-picker";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getFamilyVariantsFromStore,
  getProductBySlug,
} from "@/lib/products";
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
  if (!product || product.category !== "shop") return { title: "Not found" };
  const siteUrl = getSiteUrl();
  const ogImage = product.heroImage.startsWith("data:")
    ? undefined
    : [{ url: `${siteUrl}${product.heroImage}` }];
  return {
    title: `${product.name} · Obsidian River`,
    description: product.tagline,
    alternates: {
      canonical: `${siteUrl}/${locale}/shop/${slug}`,
      languages: {
        en: `${siteUrl}/en/shop/${slug}`,
        bg: `${siteUrl}/bg/shop/${slug}`,
      },
    },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: ogImage,
    },
  };
}

export default async function ShopProductPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const product = await getProductBySlug(slug, locale);
  if (!product || product.category !== "shop") notFound();
  const p = dictionary.product;
  const s = dictionary.shop;

  const variants = product.family
    ? (await getFamilyVariantsFromStore(product.family, locale))
        .filter((item) => item.resin)
        .map((item) => ({
          slug: item.slug,
          resin: item.resin!,
          label:
            item.resin === "blue"
              ? dictionary.shop.resinBlue
              : dictionary.shop.resinBlack,
        }))
    : [];

  const priceEur =
    product.pricing.type === "fixed" ? product.pricing.amountEur : 0;

  return (
    <div className="pt-20">
      <JsonLd
        data={productJsonLd({
          locale,
          name: product.name,
          description: product.description,
          image: product.heroImage.startsWith("data:")
            ? "/brand/mark.svg"
            : product.heroImage,
          slug: product.slug,
          priceEur:
            product.pricing.type === "fixed"
              ? product.pricing.amountEur
              : undefined,
          pathPrefix: "shop",
        })}
      />
      <section className="relative min-h-[65vh] overflow-hidden">
        <ProductSlideshow
          images={product.images}
          alt={product.name}
          className="min-h-[65vh]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-end px-6 pb-16 md:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              {p.object}
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
          {product.pricing.type === "fixed" ? (
            product.inStock ? (
              <AddToCartButton
                locale={locale}
                slug={product.slug}
                name={product.name}
                unitPriceEur={priceEur}
                image={product.heroImage}
                label={p.addToCart}
                addedLabel={p.addedToCart}
                viewCartLabel={p.viewCart}
              />
            ) : (
              <p className="mt-10 text-xs tracking-[0.2em] text-accent uppercase">
                {p.soldOut}
              </p>
            )
          ) : null}
        </div>

        <aside className="space-y-8 border border-border bg-surface p-8">
          {variants.length > 1 ? (
            <ResinVariantPicker
              locale={locale}
              currentSlug={product.slug}
              options={variants}
              label={s.resinLabel}
            />
          ) : null}
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
            <p className="mt-3 font-serif text-3xl text-foreground">
              {product.priceLabel}
            </p>
            {product.pricing.type === "fixed" ? (
              <p className="mt-2 text-xs text-muted">
                {product.inStock
                  ? product.stockQty <= 3
                    ? p.lowStock.replace("{n}", String(product.stockQty))
                    : p.fixedNote
                  : p.soldOut}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted">{p.fixedNote}</p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
