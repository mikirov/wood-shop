"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import type { Locale } from "@/i18n/config";

export function CartLink({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const { itemCount, ready } = useCart();
  return (
    <Link
      href={`/${locale}/cart`}
      className="cursor-pointer text-[0.65rem] tracking-[0.14em] text-muted uppercase hover:text-accent md:text-xs md:tracking-[0.18em]"
    >
      {label}
      {ready && itemCount > 0 ? ` (${itemCount})` : ""}
    </Link>
  );
}
