"use client";

import Link from "next/link";
import { ProductMedia } from "@/components/product-media";
import { useWishlist } from "@/components/wishlist-provider";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function WishlistView({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { items, remove, ready } = useWishlist();
  const w = dictionary.wishlist;

  if (!ready) {
    return <p className="text-sm text-muted">{dictionary.cart.loading}</p>;
  }

  if (items.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted">{w.empty}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-8 inline-flex text-xs tracking-[0.16em] text-accent uppercase"
        >
          {w.browse} →
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug} className="border border-border bg-surface">
          <Link href={item.href} className="group block">
            <div className="relative aspect-square overflow-hidden">
              <ProductMedia
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="font-serif text-2xl text-foreground">{item.name}</p>
              {item.priceLabel ? (
                <p className="mt-2 text-xs tracking-[0.12em] text-accent uppercase">
                  {item.priceLabel}
                </p>
              ) : null}
            </div>
          </Link>
          <button
            type="button"
            onClick={() => remove(item.slug)}
            className="mb-5 ml-5 cursor-pointer text-xs tracking-[0.14em] text-muted uppercase hover:text-accent"
          >
            {w.remove}
          </button>
        </li>
      ))}
    </ul>
  );
}
