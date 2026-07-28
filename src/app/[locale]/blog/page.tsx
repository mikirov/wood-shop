import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getAllBlogPosts } from "@/content/blog/posts";
import { getPostContent } from "@/content/blog/types";
import { breadcrumbJsonLd } from "@/lib/blog-json-ld";
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
  const siteUrl = getSiteUrl();
  return {
    title: `${d.blog.title} · ${d.brand}`,
    description: d.blog.intro,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        bg: `${siteUrl}/bg/blog`,
      },
    },
    openGraph: {
      title: d.blog.title,
      description: d.blog.intro,
      type: "website",
    },
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const b = dictionary.blog;
  const posts = getAllBlogPosts();

  return (
    <div className="pt-28">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dictionary.brand, path: "" },
          { name: b.title, path: "/blog" },
        ])}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {b.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
          {b.title}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {b.intro}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-2 md:px-10">
        {posts.map((post) => {
          const content = getPostContent(post, locale);
          return (
            <article key={post.slug} className="group">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-5 text-xs tracking-[0.16em] text-muted uppercase">
                  {post.publishedAt}
                </p>
                <h2 className="mt-3 font-serif text-3xl text-foreground group-hover:text-accent">
                  {content.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {content.excerpt}
                </p>
                <p className="mt-5 text-xs tracking-[0.16em] text-accent uppercase">
                  {b.readMore} →
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
