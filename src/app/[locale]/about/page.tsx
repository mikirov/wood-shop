import type { Metadata } from "next";
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
    title: `${d.about.eyebrow} · ${d.brand}`,
    description: d.about.body.slice(0, 155),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        bg: `${siteUrl}/bg/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const a = getDictionary(locale).about;

  return (
    <div className="pt-28">
      <div className="relative overflow-hidden border-b border-border">
        <div className="smoke-veil absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {a.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
            {a.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
            {a.body}
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
        {a.values.map((item) => (
          <div key={item.title}>
            <h2 className="font-serif text-2xl text-foreground">{item.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
