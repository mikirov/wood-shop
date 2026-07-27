import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

type ProductTrustProps = {
  dictionary: Dictionary;
  productSlug: string;
  productName: string;
};

function pickReviews(
  reviews: Dictionary["product"]["reviews"],
  slug: string,
  count = 3,
) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const copy = [...reviews];
  const chosen = [];
  for (let i = 0; i < Math.min(count, copy.length); i += 1) {
    const index = hash % copy.length;
    chosen.push(copy.splice(index, 1)[0]);
    hash = (hash * 17 + 13) >>> 0;
  }
  return chosen;
}

export function ProductTrust({
  dictionary,
  productSlug,
  productName,
}: ProductTrustProps) {
  const p = dictionary.product;
  const reviews = pickReviews(p.reviews, productSlug);

  return (
    <div className="mt-16 space-y-14 border-t border-border pt-14">
      <section>
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {p.giftEyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl text-foreground">{p.giftTitle}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {p.giftBody.replace("{product}", productName)}
        </p>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            {p.packagingEyebrow}
          </p>
          <h3 className="mt-3 font-serif text-3xl text-foreground">
            {p.packagingTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {p.packagingBody}
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src="/brand/packaging.jpg"
            alt={p.packagingTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </section>

      <section>
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {p.guaranteeEyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl text-foreground">
          {p.guaranteeTitle}
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {p.guarantees.map((item) => (
            <li key={item.title} className="border border-border bg-surface p-5">
              <p className="font-serif text-xl text-foreground">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {p.reviewsEyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl text-foreground">
          {p.reviewsTitle}
        </h3>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.name + review.text.slice(0, 12)} className="border border-border bg-surface p-5">
              <p className="text-xs tracking-[0.14em] text-accent uppercase">
                {review.rating}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                “{review.text}”
              </p>
              <p className="mt-4 text-xs tracking-[0.12em] text-muted uppercase">
                {review.name} · {review.place}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
