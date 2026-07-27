import type { Locale } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Obsidian River",
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/products/midnight-vein.jpg`,
    email: "shimonchick@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BG",
    },
    areaServed: "EU",
  };
}

export function productJsonLd(input: {
  locale: Locale;
  name: string;
  description: string;
  image: string;
  slug: string;
  priceEur?: number;
  pathPrefix?: "shop" | "custom" | "collection";
}) {
  const siteUrl = getSiteUrl();
  const prefix = input.pathPrefix ?? "shop";
  const base = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: [`${siteUrl}${input.image}`],
    brand: { "@type": "Brand", name: "Obsidian River" },
    url: `${siteUrl}/${input.locale}/${prefix}/${input.slug}`,
  };

  if (input.priceEur != null) {
    return {
      ...base,
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: input.priceEur,
        availability: "https://schema.org/InStock",
      },
    };
  }

  return {
    ...base,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      description: "Price on request",
    },
  };
}
