"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(en|bg)/, "") || "";

  const links = [
    { href: `/${locale}/shop`, label: dictionary.nav.shop },
    { href: `/${locale}/custom`, label: dictionary.nav.custom },
    { href: `/${locale}/about`, label: dictionary.nav.atelier },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-foreground"
        >
          <Image
            src="/brand/mark.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="font-serif text-lg tracking-[0.18em] uppercase md:text-2xl">
            {dictionary.brand}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 md:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-[0.65rem] tracking-[0.14em] text-muted uppercase hover:text-accent md:text-xs md:tracking-[0.18em]"
            >
              {link.label}
            </Link>
          ))}
          <div
            className="flex items-center border border-border/80 text-[0.65rem] tracking-[0.14em]"
            aria-label="Language"
          >
            <Link
              href={`/en${pathWithoutLocale}`}
              className={`cursor-pointer px-2.5 py-1.5 uppercase ${
                locale === "en"
                  ? "bg-accent text-background"
                  : "text-muted hover:text-accent"
              }`}
              hrefLang="en"
            >
              {dictionary.header.langEn}
            </Link>
            <Link
              href={`/bg${pathWithoutLocale}`}
              className={`cursor-pointer px-2.5 py-1.5 uppercase ${
                locale === "bg"
                  ? "bg-accent text-background"
                  : "text-muted hover:text-accent"
              }`}
              hrefLang="bg"
            >
              {dictionary.header.langBg}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
