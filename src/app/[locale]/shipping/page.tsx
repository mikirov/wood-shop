import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

async function resolve(params: PageProps["params"]) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  return raw as Locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolve(params);
  if (!locale) return {};
  const d = getDictionary(locale);
  const siteUrl = getSiteUrl();
  return {
    title: `${d.shipping.title} · ${d.brand}`,
    description: d.shipping.body.slice(0, 155),
    alternates: {
      canonical: `${siteUrl}/${locale}/shipping`,
      languages: {
        en: `${siteUrl}/en/shipping`,
        bg: `${siteUrl}/bg/shipping`,
      },
    },
  };
}

export default async function ShippingPage({ params }: PageProps) {
  const locale = await resolve(params);
  if (!locale) notFound();
  const s = getDictionary(locale).shipping;

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {s.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">{s.title}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted">{s.body}</p>
        <ul className="mt-10 space-y-4">
          {s.bullets.map((item) => (
            <li key={item} className="border-l border-accent pl-4 text-sm text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
