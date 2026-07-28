import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogSlugs,
} from "@/content/blog/posts";
import { getPostContent } from "@/content/blog/types";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/blog-json-ld";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const content = getPostContent(post, locale);
  const siteUrl = getSiteUrl();
  const d = getDictionary(locale);
  return {
    title: `${content.title} · ${d.brand}`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        bg: `${siteUrl}/bg/blog/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: `${siteUrl}${post.coverImage}` }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const dictionary = getDictionary(locale);
  const b = dictionary.blog;
  const content = getPostContent(post, locale);
  const relatedLabels: Record<(typeof post.related)[number]["labelKey"], string> =
    {
      shop: dictionary.nav.shop,
      custom: dictionary.nav.custom,
      about: dictionary.nav.atelier,
      shipping: dictionary.footer.shipping,
    };

  const others = getAllBlogPosts()
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="pt-28">
      <JsonLd
        data={[
          articleJsonLd({ locale, post, content }),
          breadcrumbJsonLd(locale, [
            { name: dictionary.brand, path: "" },
            { name: b.title, path: "/blog" },
            { name: content.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex text-xs tracking-[0.16em] text-muted uppercase hover:text-accent"
        >
          ← {b.back}
        </Link>
        <p className="mt-8 text-xs tracking-[0.2em] text-accent uppercase">
          {b.eyebrow} · {post.publishedAt}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted">
          {content.excerpt}
        </p>
      </div>

      <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden bg-surface">
        <Image
          src={post.coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 64rem"
          priority
        />
      </div>

      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16 md:px-10">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-3xl text-foreground">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-5 text-base leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <aside className="border border-border bg-surface p-6">
          <p className="text-xs tracking-[0.16em] text-accent uppercase">
            {b.related}
          </p>
          <ul className="mt-4 space-y-3">
            {post.related.map((item) => (
              <li key={item.path}>
                <Link
                  href={`/${locale}${item.path}`}
                  className="cursor-pointer text-sm text-foreground hover:text-accent"
                >
                  {relatedLabels[item.labelKey]} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {others.length > 0 ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              {b.more}
            </p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {others.map((entry) => {
                const entryContent = getPostContent(entry, locale);
                return (
                  <Link
                    key={entry.slug}
                    href={`/${locale}/blog/${entry.slug}`}
                    className="group cursor-pointer"
                  >
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-accent">
                      {entryContent.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {entryContent.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
