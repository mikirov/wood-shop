"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { ResinColor } from "@/lib/catalog";

type VariantOption = {
  slug: string;
  resin: ResinColor;
  label: string;
};

type Props = {
  locale: Locale;
  currentSlug: string;
  options: VariantOption[];
  label: string;
};

export function ResinVariantPicker({
  locale,
  currentSlug,
  options,
  label,
}: Props) {
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-accent uppercase">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.slug === currentSlug;
          return (
            <Link
              key={option.slug}
              href={`/${locale}/shop/${option.slug}`}
              className={`cursor-pointer border px-4 py-2 text-xs tracking-[0.14em] uppercase ${
                active
                  ? "border-accent bg-accent text-background"
                  : "border-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
