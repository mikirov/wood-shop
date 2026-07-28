import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return (
    <CartProvider>
      <WishlistProvider>
        <div lang={locale} className="flex min-h-full flex-col">
          <div className="grain" aria-hidden />
          <SiteHeader locale={locale} dictionary={dictionary} />
          <main className="flex-1">{children}</main>
          <SiteFooter locale={locale} dictionary={dictionary} />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
