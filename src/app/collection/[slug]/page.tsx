import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG } from "@/lib/catalog";
import { getProductBySlug } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CATALOG.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Piece not found" };
  }
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="pt-20">
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 pb-16 md:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              Signature piece
            </p>
            <h1 className="mt-4 font-serif text-5xl text-foreground md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted">{product.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div>
          <h2 className="font-serif text-3xl text-foreground">The story</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          <Link
            href={`/quote?product=${product.slug}`}
            className="mt-10 inline-flex cursor-pointer border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong hover:border-accent-strong"
          >
            Request a quote
          </Link>
        </div>

        <aside className="space-y-8 border border-border bg-surface p-8">
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              Materials
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.materials}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              Dimensions
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.dimensions}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              Lead time
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {product.leadTime}
            </p>
          </div>
          {product.priceFrom ? (
            <div>
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Commission
              </p>
              <p className="mt-3 font-serif text-2xl text-foreground">
                {product.priceFrom}
              </p>
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
