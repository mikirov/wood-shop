import type { Locale } from "@/i18n/config";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogLocaleContent = {
  title: string;
  description: string;
  excerpt: string;
  sections: BlogSection[];
};

export type BlogPost = {
  slug: string;
  publishedAt: string;
  coverImage: string;
  related: { path: string; labelKey: "shop" | "custom" | "about" | "shipping" }[];
  en: BlogLocaleContent;
  bg: BlogLocaleContent;
};

export function getPostContent(post: BlogPost, locale: Locale): BlogLocaleContent {
  return post[locale];
}
