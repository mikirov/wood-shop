import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartView } from "@/components/cart-view";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const d = getDictionary(locale);
  return {
    title: `${d.cart.title} · ${d.brand}`,
    robots: { index: false, follow: false },
    alternates: { canonical: `${getSiteUrl()}/${locale}/cart` },
  };
}

export default async function CartPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10 md:py-16">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {dictionary.cart.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">
          {dictionary.cart.title}
        </h1>
        <div className="mt-12">
          <CartView locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </div>
  );
}
