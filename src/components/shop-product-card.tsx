"use client";

import Link from "next/link";
import { HeartButton } from "@/components/heart-button";
import { ProductMedia } from "@/components/product-media";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type ShopProductCardProps = {
  locale: Locale;
  dictionary: Dictionary;
  product: {
    slug: string;
    name: string;
    tagline: string;
    heroImage: string;
    priceLabel: string | null;
    leadTime: string;
    inStock: boolean;
  };
};

export function ShopProductCard({
  locale,
  dictionary,
  product,
}: ShopProductCardProps) {
  const s = dictionary.shop;
  const href = `/${locale}/shop/${product.slug}`;

  return (
    <article className="group relative">
      <div className="absolute top-3 right-3 z-10">
        <HeartButton
          item={{
            slug: product.slug,
            name: product.name,
            image: product.heroImage,
            priceLabel: product.priceLabel,
            href,
          }}
          addLabel={dictionary.product.heartAdd}
          removeLabel={dictionary.product.heartRemove}
          className="border-border/80 bg-background/90 backdrop-blur-sm"
        />
      </div>
      <Link href={href} className="cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-surface">
          <ProductMedia
            src={product.heroImage}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <p className="mt-4 font-serif text-2xl text-foreground">{product.name}</p>
        <p className="mt-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs tracking-[0.14em] text-accent uppercase">
            {product.priceLabel}
          </p>
          <p className="text-xs tracking-[0.12em] text-muted uppercase">
            {product.inStock ? product.leadTime : dictionary.product.soldOut}
          </p>
        </div>
        <p className="mt-4 text-xs tracking-[0.16em] text-foreground uppercase group-hover:text-accent">
          {s.buyNow} →
        </p>
      </Link>
    </article>
  );
}
