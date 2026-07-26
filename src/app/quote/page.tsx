import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { listProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Commission an Obsidian River epoxy table.",
};

type PageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function QuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const products = await listProducts();

  return (
    <div className="pt-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-16">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            Commission
          </p>
          <h1 className="mt-4 font-serif text-5xl text-foreground md:text-6xl">
            Request a quote
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            Tell us the piece, the room, and the dimensions you have in mind.
            We reply within two business days with timeline and deposit details.
          </p>
        </div>
        <QuoteForm products={products} selectedSlug={params.product} />
      </div>
    </div>
  );
}
