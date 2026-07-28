import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WishlistView } from "@/components/wishlist-view";
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
    title: `${d.wishlist.title} · ${d.brand}`,
    robots: { index: false, follow: false },
    alternates: { canonical: `${getSiteUrl()}/${locale}/wishlist` },
  };
}

export default async function WishlistPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-16">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {dictionary.wishlist.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">
          {dictionary.wishlist.title}
        </h1>
        <div className="mt-12">
          <WishlistView locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </div>
  );
}
