import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const siteUrl = getSiteUrl();
  return {
    title: `${d.contact.title} · ${d.brand}`,
    description: d.contact.intro,
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        en: `${siteUrl}/en/contact`,
        bg: `${siteUrl}/bg/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getDictionary(locale).contact;

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {c.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">{c.title}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted">{c.intro}</p>
        <dl className="mt-12 space-y-8 border border-border bg-surface p-8">
          <div>
            <dt className="text-xs tracking-[0.14em] text-accent uppercase">
              {c.emailLabel}
            </dt>
            <dd className="mt-2 text-foreground">
              <a
                href={`mailto:${c.emailValue}`}
                className="cursor-pointer hover:text-accent"
              >
                {c.emailValue}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-accent uppercase">
              {c.hoursLabel}
            </dt>
            <dd className="mt-2 text-foreground">{c.hoursValue}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-accent uppercase">
              {c.locationLabel}
            </dt>
            <dd className="mt-2 text-foreground">{c.locationValue}</dd>
          </div>
        </dl>
        <Link
          href={`/${locale}/quote`}
          className="mt-10 inline-flex cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong"
        >
          {c.ctaQuote}
        </Link>
      </div>
    </div>
  );
}
