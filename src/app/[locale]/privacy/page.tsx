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
    title: `${d.privacy.title} · ${d.brand}`,
    description: d.privacy.body.slice(0, 155),
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        en: `${siteUrl}/en/privacy`,
        bg: `${siteUrl}/bg/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const d = getDictionary(raw as Locale).privacy;
  return (
    <div className="pt-28">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">{d.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">{d.title}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted">{d.body}</p>
      </div>
    </div>
  );
}
