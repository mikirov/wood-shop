import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog/posts";
import { CATALOG } from "@/lib/catalog";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
  "",
  "/shop",
  "/custom",
  "/about",
  "/blog",
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
    CATALOG.map((product) => {
      const prefix = product.category === "shop" ? "shop" : "custom";
      return {
        url: `${siteUrl}/${locale}/${prefix}/${product.slug}`,
        lastModified: now,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [
              alt,
              `${siteUrl}/${alt}/${prefix}/${product.slug}`,
            ]),
          ),
        },
      };
    }),
  );

  const posts = locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}/${alt}/blog/${post.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...pages, ...products, ...posts];
}
