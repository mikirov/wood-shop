import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const shop = [
    { href: `/${locale}/shop`, label: dictionary.nav.shop },
    { href: `/${locale}/custom`, label: dictionary.nav.custom },
    { href: `/${locale}/blog`, label: dictionary.nav.blog },
    { href: `/${locale}/about`, label: dictionary.nav.atelier },
    { href: `/${locale}/quote`, label: dictionary.nav.quote },
  ];
  const help = [
    { href: `/${locale}/shipping`, label: dictionary.footer.shipping },
    { href: `/${locale}/returns`, label: dictionary.footer.returns },
    { href: `/${locale}/contact`, label: dictionary.footer.contact },
    { href: `/${locale}/privacy`, label: dictionary.footer.privacy },
    { href: `/${locale}/terms`, label: dictionary.footer.terms },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-1">
          <Link href={`/${locale}`} className="inline-flex items-center gap-3">
            <Image
              src="/brand/mark.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-serif text-2xl tracking-[0.14em] text-foreground uppercase">
              {dictionary.brand}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {dictionary.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.16em] text-accent uppercase">
            {dictionary.footer.shop}
          </p>
          <ul className="mt-4 space-y-3">
            {shop.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-sm text-muted hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.16em] text-accent uppercase">
            {dictionary.footer.help}
          </p>
          <ul className="mt-4 space-y-3">
            {help.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-sm text-muted hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.16em] text-accent uppercase">
            {dictionary.footer.newsletter}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {dictionary.footer.newsletterHint}
          </p>
          <form className="mt-5 flex border border-border">
            <input
              type="email"
              name="email"
              required
              placeholder={dictionary.footer.emailPlaceholder}
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm outline-none"
              aria-label={dictionary.footer.emailPlaceholder}
            />
            <button
              type="submit"
              className="cursor-pointer bg-accent px-4 text-[0.65rem] tracking-[0.14em] text-background uppercase hover:bg-accent-strong"
            >
              {dictionary.footer.subscribe}
            </button>
          </form>
          <p className="mt-6 text-xs tracking-[0.14em] text-muted uppercase">
            {dictionary.footer.follow}
          </p>
          <div className="mt-3 flex gap-4 text-sm text-muted">
            <a
              href="https://instagram.com"
              className="cursor-pointer hover:text-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              className="cursor-pointer hover:text-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {dictionary.brand}.{" "}
            {dictionary.footer.rights}
          </p>
          <p>Bulgaria · EU</p>
        </div>
      </div>
    </footer>
  );
}
