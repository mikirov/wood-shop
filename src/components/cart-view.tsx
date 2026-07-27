"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { isDataImage } from "@/lib/images";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type CartViewProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function LineImage({ src, alt }: { src: string; alt: string }) {
  if (isDataImage(src) || !src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    );
  }
  return (
    <Image src={src} alt={alt} fill className="object-cover" sizes="96px" />
  );
}

export function CartView({ locale, dictionary }: CartViewProps) {
  const { lines, subtotalEur, setQuantity, removeItem, ready } = useCart();
  const c = dictionary.cart;

  if (!ready) {
    return <p className="text-sm text-muted">{c.loading}</p>;
  }

  if (lines.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted">{c.empty}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-8 inline-flex text-xs tracking-[0.16em] text-accent uppercase"
        >
          {c.continueShopping} →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {lines.map((line) => (
          <li
            key={line.slug}
            className="grid gap-4 border border-border bg-surface p-4 md:grid-cols-[96px_1fr_auto]"
          >
            <div className="relative h-24 w-24 overflow-hidden bg-background">
              <LineImage src={line.image} alt={line.name} />
            </div>
            <div>
              <Link
                href={`/${locale}/shop/${line.slug}`}
                className="font-serif text-2xl text-foreground hover:text-accent"
              >
                {line.name}
              </Link>
              <p className="mt-2 text-sm text-muted">
                €{line.unitPriceEur.toFixed(0)}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-xs tracking-[0.12em] text-muted uppercase">
                  {c.quantity}
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={line.quantity}
                    onChange={(event) =>
                      setQuantity(line.slug, Number(event.target.value) || 1)
                    }
                    className="ml-3 w-16"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(line.slug)}
                  className="cursor-pointer text-xs tracking-[0.12em] text-red-400 uppercase"
                >
                  {c.remove}
                </button>
              </div>
            </div>
            <p className="font-serif text-2xl text-foreground md:text-right">
              €{(line.unitPriceEur * line.quantity).toFixed(0)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="font-serif text-3xl text-foreground">
          {c.subtotal}: €{subtotalEur.toFixed(0)}
        </p>
        <Link
          href={`/${locale}/checkout`}
          className="border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong"
        >
          {c.checkout}
        </Link>
      </div>
    </div>
  );
}
