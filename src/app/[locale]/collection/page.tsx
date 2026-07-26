import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string }> };

export default async function CollectionRedirect({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  redirect(`/${locale}/shop`);
}
