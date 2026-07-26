import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/catalog";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
  "",
  "/collection",
  "/about",
  "/quote",
  "/contact",
  "/shipping",
  "/returns",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${siteUrl}/${alt}${path}`]),
        ),
      },
    })),
  );

  const products = locales.flatMap((locale) =>
    CATALOG.map((product) => ({
      url: `${siteUrl}/${locale}/collection/${product.slug}`,
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}/${alt}/collection/${product.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...pages, ...products];
}
