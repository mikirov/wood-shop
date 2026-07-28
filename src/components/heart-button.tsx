"use client";

import { useWishlist, type WishlistItem } from "@/components/wishlist-provider";

type HeartButtonProps = {
  item: WishlistItem;
  addLabel: string;
  removeLabel: string;
  className?: string;
};

export function HeartButton({
  item,
  addLabel,
  removeLabel,
  className = "",
}: HeartButtonProps) {
  const { has, toggle, ready } = useWishlist();
  const active = has(item.slug);

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() => toggle(item)}
      aria-pressed={active}
      aria-label={active ? removeLabel : addLabel}
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-border bg-background/80 text-lg leading-none transition hover:border-accent ${
        active ? "text-accent" : "text-muted"
      } ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
