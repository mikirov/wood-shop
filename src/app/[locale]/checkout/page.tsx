import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout-form";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const siteUrl = getSiteUrl();
  return {
    title: `${d.checkout.title} · ${d.brand}`,
    description: d.checkout.intro,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${siteUrl}/${locale}/checkout`,
    },
  };
}

export default async function CheckoutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const c = dictionary.checkout;

  return (
    <div className="pt-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-8 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-16">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {c.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-5xl text-foreground md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            {c.intro}
          </p>
        </div>
        <CheckoutForm locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}
