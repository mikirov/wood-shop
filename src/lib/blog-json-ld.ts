import type { Locale } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";
import type { BlogLocaleContent, BlogPost } from "@/content/blog/types";

export function articleJsonLd(input: {
  locale: Locale;
  post: BlogPost;
  content: BlogLocaleContent;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${input.locale}/blog/${input.post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.content.title,
    description: input.content.description,
    image: [`${siteUrl}${input.post.coverImage}`],
    datePublished: input.post.publishedAt,
    dateModified: input.post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Obsidian River",
      url: `${siteUrl}/${input.locale}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Obsidian River",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: input.locale === "bg" ? "bg-BG" : "en-GB",
    url,
  };
}

export function faqPageJsonLd(
  locale: Locale,
  faqs: { q: string; a: string }[],
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${siteUrl}/${locale}`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };
}
