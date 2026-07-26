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
      "European walnut, pigmented epoxy resin, blackened steel base, oil-rubbed finish",
    dimensions:
      "Typical: 240–280 cm L × 100–110 cm W × 75 cm H. Custom lengths on request.",
    leadTime: "10–14 weeks from deposit",
    priceFrom: "From €11,900",
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
    dimensions: "Typical: 150 cm L × 35 cm W × 80 cm H. Custom widths available.",
    leadTime: "8–12 weeks from deposit",
    priceFrom: "From €4,250",
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
      "Typical: 300–360 cm L × 110–120 cm W × 75 cm H. Seats 10–14.",
    leadTime: "12–16 weeks from deposit",
    priceFrom: "From €16,800",
    heroImage: "/products/ashmoor-conference.jpg",
    galleryImages: ["/products/ashmoor-conference.jpg"],
    sortOrder: 3,
  },
  {
    slug: "night-tide-coasters",
    name: "Night Tide Coasters",
    tagline: "A set of four walnut discs with indigo resin veins.",
    description:
      "Four hand-finished walnut coasters, each with a charcoal–indigo epoxy vein under a soft gloss. Felted undersides protect stone and wood. A small ritual for dark whisky nights and quiet tables.",
    materials: "Walnut, pigmented epoxy resin, cork/felt base, food-safe finish",
    dimensions: "Set of 4 · Ø 10 cm × 1 cm thick",
    leadTime: "2–3 weeks",
    priceFrom: "From €68",
    heroImage: "/products/night-tide-coasters.jpg",
    galleryImages: ["/products/night-tide-coasters.jpg"],
    sortOrder: 4,
  },
  {
    slug: "ember-grain-board",
    name: "Ember Grain Cutting Board",
    tagline: "Charred oak board fractured by an amber epoxy seam.",
    description:
      "A substantial end-grain-feel cutting board in charred oak, split by a cooled-lava amber resin line. Juice groove optional on commission. Built to live on the counter — not hide in a drawer.",
    materials: "Charred oak, amber epoxy resin, food-safe oil finish, brass hanging detail",
    dimensions: "Typical: 45 × 30 × 3.5 cm",
    leadTime: "3–5 weeks",
    priceFrom: "From €185",
    heroImage: "/products/ember-grain-board.jpg",
    galleryImages: ["/products/ember-grain-board.jpg"],
    sortOrder: 5,
  },
  {
    slug: "ash-vein-tray",
    name: "Ash Vein Catch Tray",
    tagline: "Shallow ash tray veiled in smoky grey resin mist.",
    description:
      "A shallow catch-all for keys, cufflinks, and evening clutter. Pale ash with a translucent grey epoxy mist and faint metallic flecks — the same language as Ashmoor, scaled for the entry table.",
    materials: "European ash, translucent grey epoxy with metallic flecks, matte oil finish",
    dimensions: "Typical: 28 × 18 × 3 cm",
    leadTime: "2–4 weeks",
    priceFrom: "From €145",
    heroImage: "/products/ash-vein-tray.jpg",
    galleryImages: ["/products/ash-vein-tray.jpg"],
    sortOrder: 6,
  },
];

export function getCatalogProduct(slug: string) {
  return CATALOG.find((product) => product.slug === slug);
}
