"use client";

import Link from "next/link";
import { useWishlist } from "@/components/wishlist-provider";
import type { Locale } from "@/i18n/config";

export function WishlistLink({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const { count, ready } = useWishlist();
  return (
    <Link
      href={`/${locale}/wishlist`}
      className="inline-flex cursor-pointer items-center gap-1.5 text-[0.65rem] tracking-[0.14em] text-muted uppercase hover:text-accent md:text-xs md:tracking-[0.18em]"
      aria-label={label}
    >
      <span aria-hidden className="text-base leading-none">
        ♥
      </span>
      <span className="hidden sm:inline">{label}</span>
      {ready && count > 0 ? (
        <span className="text-accent">({count})</span>
      ) : null}
    </Link>
  );
}
