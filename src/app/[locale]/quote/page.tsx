import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { listProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const siteUrl = getSiteUrl();
  return {
    title: `${d.quote.title} · ${d.brand}`,
    description: d.quote.intro,
    alternates: {
      canonical: `${siteUrl}/${locale}/quote`,
      languages: {
        en: `${siteUrl}/en/quote`,
        bg: `${siteUrl}/bg/quote`,
      },
    },
  };
}

export default async function QuotePage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const products = await listProducts(locale);
  const { product } = await searchParams;
  const q = dictionary.quote;

  return (
    <div className="pt-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-16">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {q.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-5xl text-foreground md:text-6xl">
            {q.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            {q.intro}
          </p>
        </div>
        <QuoteForm
          dictionary={dictionary}
          products={products}
          selectedSlug={product}
        />
      </div>
    </div>
  );
}
