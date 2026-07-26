export type CatalogProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  materials: string;
  dimensions: string;
  leadTime: string;
  priceFrom: string;
  heroImage: string;
  galleryImages: string[];
  sortOrder: number;
};

export const CATALOG: CatalogProduct[] = [
  {
    slug: "midnight-vein",
    name: "Midnight Vein Dining Table",
    tagline: "Walnut slabs parted by a charcoal–indigo resin river.",
    description:
      "Two live-edge walnut flanks frame a deep charcoal-to-indigo epoxy pour, laced with faint smoke swirls that catch candlelight. Blackened steel legs taper to a quiet point. Built for formal dining — eight to ten seats — and rooms that prefer shadow over glare.",
    materials:
      "American black walnut, pigmented epoxy resin, blackened steel base, oil-rubbed finish",
    dimensions:
      "Typical: 96–110\" L × 40–44\" W × 30\" H. Custom lengths on request.",
    leadTime: "10–14 weeks from deposit",
    priceFrom: "From $12,800",
    heroImage: "/products/midnight-vein.jpg",
    galleryImages: ["/products/midnight-vein.jpg"],
    sortOrder: 1,
  },
  {
    slug: "ember-fracture",
    name: "Ember Fracture Console",
    tagline: "Charred oak split by a cooled-lava amber seam.",
    description:
      "A narrow entry console in charred oak, fractured by an amber–ember resin seam that reads like lava sealed under glass. Brass foot caps warm the silhouette. Suited to hallways, bars, and quiet thresholds.",
    materials:
      "Charred oak, amber epoxy resin, solid brass foot caps, matte oil finish",
    dimensions: "Typical: 60\" L × 14\" W × 32\" H. Custom widths available.",
    leadTime: "8–12 weeks from deposit",
    priceFrom: "From $4,600",
    heroImage: "/products/ember-fracture.jpg",
    galleryImages: ["/products/ember-fracture.jpg"],
    sortOrder: 2,
  },
  {
    slug: "ashmoor-conference",
    name: "Ashmoor Conference Slab",
    tagline: "Ash veiled in smoky grey epoxy mist and metal flecks.",
    description:
      "A wide ash conference slab washed with a translucent grey epoxy mist and subtle metallic flecks. Matte iron trestle base keeps the weight grounded. Boardroom and library scale — made for long conversations.",
    materials:
      "European ash, translucent grey epoxy with metallic flecks, matte iron trestle",
    dimensions:
      "Typical: 120–144\" L × 44–48\" W × 30\" H. Seats 10–14.",
    leadTime: "12–16 weeks from deposit",
    priceFrom: "From $18,400",
    heroImage: "/products/ashmoor-conference.jpg",
    galleryImages: ["/products/ashmoor-conference.jpg"],
    sortOrder: 3,
  },
];

export function getCatalogProduct(slug: string) {
  return CATALOG.find((product) => product.slug === slug);
}
