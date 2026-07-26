import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection",
  description: "Three signature epoxy tables from the Obsidian River atelier.",
};

export default async function CollectionPage() {
  const products = await listProducts();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          Collection
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
          Three rivers. Three tempers.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Each slab is a singular pour — walnut midnight, ember fracture, ash
          mist. Commission yours with a quote.
        </p>
      </div>

      <div className="mt-16 space-y-0">
        {products.map((product, index) => (
          <Link
            key={product.slug}
            href={`/collection/${product.slug}`}
            className="group relative block min-h-[70vh] overflow-hidden"
          >
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
              priority={index === 0}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                index % 2 === 0
                  ? "from-background/90 via-background/50 to-transparent"
                  : "from-transparent via-background/50 to-background/90"
              }`}
            />
            <div
              className={`relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 py-16 md:px-10 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="max-w-lg">
                <p className="text-xs tracking-[0.2em] text-accent uppercase">
                  0{index + 1}
                </p>
                <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {product.tagline}
                </p>
                <p className="mt-6 text-xs tracking-[0.18em] text-foreground uppercase group-hover:text-accent">
                  View piece →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
