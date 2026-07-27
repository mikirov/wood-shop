"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import type { Locale } from "@/i18n/config";

type AddToCartButtonProps = {
  locale: Locale;
  slug: string;
  name: string;
  unitPriceEur: number;
  image: string;
  label: string;
  addedLabel: string;
  viewCartLabel: string;
};

export function AddToCartButton({
  locale,
  slug,
  name,
  unitPriceEur,
  image,
  label,
  addedLabel,
  viewCartLabel,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <button
        type="button"
        className="cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong"
        onClick={() => {
          addItem({ slug, name, unitPriceEur, image }, 1);
          setAdded(true);
        }}
      >
        {added ? addedLabel : label}
      </button>
      {added ? (
        <Link
          href={`/${locale}/cart`}
          className="cursor-pointer text-xs tracking-[0.16em] text-accent uppercase hover:text-foreground"
        >
          {viewCartLabel} →
        </Link>
      ) : null}
    </div>
  );
}
