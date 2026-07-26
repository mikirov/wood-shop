import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCatalogProduct } from "@/lib/catalog";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function CollectionSlugRedirect({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const product = getCatalogProduct(slug);
  if (product?.category === "custom") {
    redirect(`/${locale}/custom/${slug}`);
  }
  if (product?.category === "shop") {
    redirect(`/${locale}/shop/${slug}`);
  }
  redirect(`/${locale}/shop`);
}
